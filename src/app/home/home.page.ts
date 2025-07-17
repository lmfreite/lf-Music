import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule,CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
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

  constructor() {}
}
