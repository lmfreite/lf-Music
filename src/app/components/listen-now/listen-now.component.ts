import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { TitleService } from 'src/app/services/title/title.service';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-listen-now',
  templateUrl: './listen-now.component.html',
  styleUrls: ['./listen-now.component.scss'],
  imports: [IonContent, HeaderComponent]
})
export class ListenNowComponent implements OnInit, OnDestroy {
  track: any;
  audio: HTMLAudioElement | null = null;

  constructor(private titleService: TitleService, private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Listen now');
    const nav = this.router.getCurrentNavigation();
    this.track = nav?.extras.state?.['track'];

    if (this.track?.preview_url) {
      this.audio = new Audio(this.track.preview_url);
      this.audio.play();
    }
  }

  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }

}
