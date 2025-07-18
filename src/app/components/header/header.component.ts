import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/services/title/title.service';
import { ThemeComponent } from '../theme/theme.component';
import { IonHeader, IonTitle, IonToolbar, IonButtons } from '@ionic/angular/standalone';
import { ThemeService } from 'src/app/services/theme/theme.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [ThemeComponent, IonHeader, IonTitle, IonToolbar,IonButtons ],
})
export class HeaderComponent  implements OnInit {
  title = '';
  constructor(private titleService: TitleService, public _theme: ThemeService) {}

  ngOnInit() {
    this.titleService.getTitle().subscribe(title => this.title = title);
  }

}
