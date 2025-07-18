import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { libraryOutline, playCircleOutline, searchOutline, homeOutline } from 'ionicons/icons';
import { ThemeService } from 'src/app/services/theme/theme.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class TabsComponent  implements OnInit {

  constructor(public _theme: ThemeService) {addIcons({ libraryOutline, playCircleOutline, searchOutline, homeOutline }); }

  ngOnInit() {}

}
