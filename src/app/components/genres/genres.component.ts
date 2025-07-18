import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { TitleService } from 'src/app/services/title/title.service';


@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
  imports: [IonContent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]


})
export class GenresComponent  implements OnInit {
  genresTitle: string = 'Genres';
genres = [
    {
      title: 'Musica Clasica',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ1XWg6rXCY6YfiJy4VcJpSMEw1xtItavvGQ&s',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad labore suscipit a facere asperiores ratione maxime deleniti doloremque rerum quidem expedita explicabo cupiditate consectetur vero vel est, quo.',
    },
    {
      title: 'Musica Pop',
      image: 'https://s1.significados.com/foto/musica-pop-og.jpg',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad labore suscipit a facere asperiores ratione maxime deleniti doloremque rerum quidem expedita explicabo cupiditate consectetur vero vel est, quo.',
    },
    {
      title: 'Musica Rock',
      image: 'https://johanycarlos.home.blog/wp-content/uploads/2019/01/depositphotos_67643805-stock-illustration-rock-music-concept.jpg',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad labore suscipit a facere asperiores ratione maxime deleniti doloremque rerum quidem expedita explicabo cupiditate consectetur vero vel est, quo.',
    }
  ];
  constructor(public _theme: ThemeService, private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.setTitle('Genres');
  }

}
