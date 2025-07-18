import { Component, OnInit } from '@angular/core';
import { IonContent} from '@ionic/angular/standalone';
import { TitleService } from 'src/app/services/title/title.service';


@Component({
  selector: 'app-listen-now',
  templateUrl: './listen-now.component.html',
  styleUrls: ['./listen-now.component.scss'],
  imports: [ IonContent]
})
export class ListenNowComponent  implements OnInit {
  listenNowTitle: string = 'Listen now';
  constructor(private titleService: TitleService) { }

   ngOnInit() {
    this.titleService.setTitle('Listen now');
  }

}
