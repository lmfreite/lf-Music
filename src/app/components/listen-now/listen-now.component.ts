import { Component, OnInit } from '@angular/core';
import { IonContent} from '@ionic/angular/standalone';
import { TitleService } from 'src/app/services/title/title.service';
import { HeaderComponent } from "../header/header.component";


@Component({
  selector: 'app-listen-now',
  templateUrl: './listen-now.component.html',
  styleUrls: ['./listen-now.component.scss'],
  imports: [IonContent, HeaderComponent]
})
export class ListenNowComponent  implements OnInit {
  constructor(private titleService: TitleService) { }

   ngOnInit() {
    this.titleService.setTitle('Listen now');
  }

}
