import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TitleService } from '../services/title/title.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class HomePage implements OnInit{
  homeTitle: string = 'Home';
   constructor(private titleService: TitleService) { }
 
    ngOnInit() {
     this.titleService.setTitle('Home');
   }
 
}
