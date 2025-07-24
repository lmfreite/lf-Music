import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { IAlbumsResponse } from 'src/app/interfaces/IAlbumsResponse';
import { MusicService } from 'src/app/services/music/music.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { TitleService } from 'src/app/services/title/title.service';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
  imports: [IonContent, HeaderComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]


})
export class GenresComponent  implements OnInit {
  private subscription: Subscription = new Subscription();

  albums: IAlbumsResponse[] = [];
  constructor(public _theme: ThemeService, private titleService: TitleService, private musicService: MusicService) { }

  ngOnInit() {
    this.titleService.setTitle('Albums');
    this.subscription = this.musicService.getAlbums().subscribe(albums => {
      this.albums = albums.sort((a, b) => a.id - b.id);
    });
  }

  ngOnDestroy() {
    this.titleService.setTitle('');
    this.subscription.unsubscribe();
  }

}
