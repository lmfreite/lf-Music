import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';
import { addIcons } from 'ionicons';
import { 
  musicalNotesOutline, 
  homeOutline, 
  libraryOutline, 
  playCircleOutline, 
  searchOutline, 
  arrowForwardOutline,
  moonOutline,
  sunnyOutline,
  repeatOutline,
  shuffleOutline,
  trendingUpOutline,
  starOutline,
  listOutline,
  heartOutline,
  downloadOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonContent,CommonModule, FormsModule, IonButton, IonIcon, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPage implements OnInit {

  constructor(
    private _storageService: StorageService,
    private router: Router
  ) {
    addIcons({ 
      musicalNotesOutline, 
      homeOutline, 
      libraryOutline, 
      playCircleOutline, 
      searchOutline, 
      arrowForwardOutline,
      moonOutline,
      sunnyOutline,
      repeatOutline,
      shuffleOutline,
      trendingUpOutline,
      starOutline,
      listOutline,
      heartOutline,
      downloadOutline
    });
  }

  ngOnInit() {
  }

  async viewIntro() {
    await this._storageService.setItem('introSeen', 'true');
    this.router.navigate(['/app/home']);
  }
}
