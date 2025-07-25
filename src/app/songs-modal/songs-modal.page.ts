import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { 
  closeCircleOutline
} from 'ionicons/icons';
import { ITracksResponse } from '../interfaces/ITracksResponse';
import { ListenNowService } from '../services/listen-now/listen-now.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class SongsModalPage implements OnInit {
  @Input() songs: ITracksResponse[] = [];

  constructor(private modalController: ModalController,private listenNowService: ListenNowService, private router: Router) { 
    addIcons({ 
      closeCircleOutline
    });
  }

  ngOnInit() {
    console.log('Songs recibidas:', this.songs);
  }

  formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  closeModal() {
    this.modalController.dismiss();
  }

    goToListenNow(track: ITracksResponse) {
      this.listenNowService.play(track);
      this.router.navigate(['/app/play'], { state: { track, tracks: this.songs } });
      this.closeModal();
    }
}
