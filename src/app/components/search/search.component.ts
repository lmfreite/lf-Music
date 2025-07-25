import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TitleService } from 'src/app/services/title/title.service';
import { HeaderComponent } from "../header/header.component";
import { MusicService } from 'src/app/services/music/music.service';
import { ITracksResponse } from 'src/app/interfaces/ITracksResponse';
import { CommonModule } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ListenNowService } from 'src/app/services/listen-now/listen-now.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [
    IonicModule,
    HeaderComponent, 
    CommonModule
  ]
})
export class SearchComponent implements OnInit, OnDestroy {
  
  searchResults: ITracksResponse[] = [];
  isSearching: boolean = false;
  hasSearched: boolean = false;
  searchQuery: string = '';
  
  private searchSubject = new Subject<string>();
  private subscription: Subscription = new Subscription();

  constructor(
    private titleService: TitleService, 
    private musicService: MusicService,
    private router: Router,
    private listenNowService: ListenNowService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Search');
    this.setupSearch();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.titleService.setTitle('');
  }

  private setupSearch() {
    this.subscription = this.searchSubject.pipe(
      debounceTime(300), // Esperar 300ms después de que el usuario deje de escribir
      distinctUntilChanged(), // Solo buscar si el término cambió
      switchMap(query => {
        if (query.trim()) {
          this.isSearching = true;
          return this.musicService.searchTracks(query);
        } else {
          this.searchResults = [];
          this.hasSearched = false;
          this.isSearching = false;
          return [];
        }
      })
    ).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.isSearching = false;
        this.hasSearched = true;
      },
      error: (error) => {
        console.error('Error en búsqueda:', error);
        this.isSearching = false;
        this.hasSearched = true;
        this.searchResults = [];
      }
    });
  }

  onSearchInput(event: any) {
    const query = event.target.value;
    this.searchQuery = query;
    this.searchSubject.next(query);
  }

  onSearchClear() {
    this.searchResults = [];
    this.hasSearched = false;
    this.isSearching = false;
    this.searchQuery = '';
  }

  formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    } else {
      return `${pad(minutes)}:${pad(seconds)}`;
    }
  }

  goToListenNow(track: ITracksResponse) {
    this.listenNowService.play(track);
    this.router.navigate(['/app/play'], { state: { track, tracks: this.searchResults } });
  }
}
