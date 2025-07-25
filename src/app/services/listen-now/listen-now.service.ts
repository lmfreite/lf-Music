import { Injectable } from '@angular/core';
import { ITracksResponse } from 'src/app/interfaces/ITracksResponse';


@Injectable({ providedIn: 'root' })
export class ListenNowService {
  private audio: HTMLAudioElement | null = null;
  private currentTrack: ITracksResponse | null = null;

  play(track: ITracksResponse) {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = ''; 
      this.audio = null;
    }
    this.currentTrack = track;
    if (track.preview_url) {
      this.audio = new Audio(track.preview_url);
      this.audio.load();
      this.audio.play().catch(() => {}); // Captura el error para evitar el warning
    }
  }

  getCurrentTrack() {
    return this.currentTrack;
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  isPlaying(): boolean {
    return !!this.audio && !this.audio.paused;
  }

  getAudio(): HTMLAudioElement | null {
    return this.audio;
  }

  getDuration(): number {
    return (this.audio?.duration !== undefined && this.audio?.duration !== 0)
      ? this.audio.duration
      : (this.currentTrack?.duration_ms !== undefined
          ? this.currentTrack.duration_ms / 1000
          : 0);
  }

  getCurrentTime(): number {
    return this.audio?.currentTime || 0;
  }
}
