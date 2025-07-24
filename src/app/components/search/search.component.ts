import { Component, OnInit } from '@angular/core';
import { IonContent} from '@ionic/angular/standalone';
import { TitleService } from 'src/app/services/title/title.service';
import { HeaderComponent } from "../header/header.component";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [IonContent, HeaderComponent]
})
export class SearchComponent  implements OnInit {

  constructor(private titleService: TitleService) { }

   ngOnInit() {
    this.titleService.setTitle('Search');
  }

}
