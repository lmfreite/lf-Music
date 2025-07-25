import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonContent, IonCard } from '@ionic/angular/standalone';
import { TitleService } from 'src/app/services/title/title.service';
import { HeaderComponent } from "../header/header.component";
import { Router, NavigationEnd } from '@angular/router';
import { ListenNowService } from 'src/app/services/listen-now/listen-now.service';
import { ITracksResponse } from 'src/app/interfaces/ITracksResponse';
import { ThemeService } from 'src/services/theme/theme.service';
import { NgClass } from '@angular/common';
import { MusicService } from 'src/app/services/music/music.service';

@Component({
  selector: 'app-listen-now',
  templateUrl: './listen-now.component.html',
  styleUrls: ['./listen-now.component.scss'],
  imports: [IonContent, HeaderComponent, IonCard, NgClass]
})
export class ListenNowComponent implements OnInit, OnDestroy {
  tracks: ITracksResponse[] = []; // Lista de canciones
  track: ITracksResponse | null = null; // Canción actual
  audio: HTMLAudioElement | null = null;
  private navSub: any;
  currentTime: number = 0;
  duration: number = 0;
  interval: any;

  constructor(
    private titleService: TitleService,
    private router: Router,
    private listenNowService: ListenNowService,
    public _theme:ThemeService,
    private musicService: MusicService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Listen now');
    this.setTrackFromNavigation();

    // Escuchar cambios de navegación para actualizar el track
    this.navSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setTrackFromNavigation();
      }
    });
  }

  setTrackFromNavigation() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state?.['track']) {
      this.track = nav.extras.state['track'];
      this.tracks = nav.extras.state['tracks'] ?? [];
      if (this.track) {
        this.listenNowService.play(this.track);
      }
    } else {
      this.track = this.listenNowService.getCurrentTrack();
      // Si no tienes tracks, intenta recuperarlos del servicio
      if (!this.tracks || this.tracks.length === 0) {
        // Suponiendo que tienes MusicService inyectado
        this.musicService.getTracks().subscribe(tracks => {
          this.tracks = tracks;
        });
      }
    }
    setTimeout(() => this.setupAudioProgress(), 200); 
  }

  setupAudioProgress() {
    const audio = this.listenNowService.getAudio();
    if (audio) {
      this.duration = audio.duration || (this.track?.duration_ms ?? 0) / 1000;
      audio.ontimeupdate = () => {
        this.currentTime = audio.currentTime;
      };
      // fallback por si duration no está listo
      audio.onloadedmetadata = () => {
        this.duration = audio.duration;
      };
    }
    // Actualización periódica (por si ontimeupdate no es suficiente)
    this.clearInterval();
    this.interval = setInterval(() => {
      const audio = this.listenNowService.getAudio();
      if (audio) {
        this.currentTime = audio.currentTime;
        this.duration = audio.duration || (this.track?.duration_ms ?? 0) / 1000;
      }
    }, 500);
  }

  clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    if (this.navSub) {
      this.navSub.unsubscribe();
    }
    this.clearInterval();
  }

  goToListenNow(track: ITracksResponse) {
    this.listenNowService.play(track);
    this.router.navigate(['/play']);
  }

  goToPlay() {
    if (this.track) {
      this.listenNowService.play(this.track);
      this.router.navigate(['/app/play'], { state: { track: this.track } });
    }
  }
  
  goToStop() {
    this.listenNowService.stop();
  }

  isPlaying(): boolean {
    return this.listenNowService.isPlaying();
  }

  formatTime(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }

  // Encuentra el índice del track actual
  getCurrentIndex(): number {
    if (!this.tracks || !Array.isArray(this.tracks) || !this.track) return -1;
    return this.tracks.findIndex(t => t.id === this.track?.id);
  }

  // Ir a la canción anterior
  goToPrev() {
    const idx = this.getCurrentIndex();
    if (idx > 0) {
      const prevTrack = this.tracks[idx - 1];
      this.listenNowService.play(prevTrack);
      this.track = prevTrack;
    }
  }

  // Ir a la canción siguiente
  goToNext() {
    const idx = this.getCurrentIndex();
    if (idx < this.tracks.length - 1) {
      const nextTrack = this.tracks[idx + 1];
      this.listenNowService.play(nextTrack);
      this.track = nextTrack;
    }
  }
}
