import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TitleService } from '../services/title/title.service';
import { MusicService } from '../services/music/music.service';
import { ITracksResponse } from '../interfaces/ITracksResponse';
import { ThemeService } from '../services/theme/theme.service';
import { Subscription } from 'rxjs';
import { HeaderComponent } from "../components/header/header.component";
import { Router } from '@angular/router';
import { ListenNowService } from '../services/listen-now/listen-now.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule, HeaderComponent],
})
export class HomePage implements OnInit {
  tracks: ITracksResponse[] = [];
  private subscription: Subscription = new Subscription();
  
  // Estados para manejar loading y error
  isLoading = true;
  hasError = false;
  errorMessage = '';

  constructor(
    private titleService: TitleService,
    private musicService: MusicService,
    public _theme: ThemeService,
    private router: Router,
    private listenNowService: ListenNowService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Home');
    this.loadTracks();
  }

  loadTracks() {
    this.isLoading = true;
    this.hasError = false;
    
    this.subscription = this.musicService.getTracks().subscribe({
      next: (tracks) => {
        this.tracks = tracks.sort((a, b) => a.id - b.id);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tracks:', error);
        this.hasError = true;
        this.isLoading = false;
        this.errorMessage = 'No se pudieron cargar las canciones';
      }
    });

    this.subscription.add(
      this.musicService.getLocalArtists().subscribe(artistsResponse => {
        const artists = artistsResponse[0].artists;
        console.log('Local Artists:', artists);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.titleService.setTitle(''); 
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
    this.router.navigate(['/app/play'], { state: { track, tracks: this.tracks } });
  }

  // Método para reintentar cargar los datos
  retry() {
    this.loadTracks();
  }
}
