import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { MusicService } from 'src/app/services/music/music.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { TitleService } from 'src/app/services/title/title.service';
import { SongsModalPage } from 'src/app/songs-modal/songs-modal.page';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { IArtistResponse } from '../interfaces/IArtistResponse';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.page.html',
  styleUrls: ['./artists.page.scss'],
  standalone: true,
  imports: [IonContent, HeaderComponent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArtistsPage implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  artists: IArtistResponse[] = [];

  // Estados para manejar loading y error
  isLoading = true;
  hasError = false;

  constructor(
    public _theme: ThemeService,
    private titleService: TitleService,
    private musicService: MusicService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Artists');
    this.loadArtists();
  }

  loadArtists() {
    this.isLoading = true;
    this.hasError = false;

    this.subscription = this.musicService.getArtists().subscribe({
      next: (artists) => {
        this.artists = artists.sort((a, b) => a.id - b.id);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading artists:', error);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    this.titleService.setTitle('');
    this.subscription.unsubscribe();
  }

  async getSongsArtist(artistId: number) {
    this.musicService.getTracksArtistById(artistId).subscribe(async songs => {
      const modal = await this.modalController.create({
        component: SongsModalPage, 
        componentProps: {
          songs: songs
        }
      });
      await modal.present();
    });
  }
}

