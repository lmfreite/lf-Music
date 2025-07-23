import { Component, Input, OnInit } from '@angular/core';
import { TitleService } from 'src/app/services/title/title.service';
import { ThemeComponent } from '../theme/theme.component';
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, AlertController } from '@ionic/angular/standalone';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons'; 
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [ThemeComponent, IonHeader, IonTitle, IonToolbar,IonButtons,IonIcon ],
})
export class HeaderComponent  implements OnInit {
  @Input() title: string = '';

  constructor(
    private titleService: TitleService, 
    public _theme: ThemeService,
    private alertController: AlertController,
    private storageService: StorageService,
    private router: Router
  ) {addIcons({logOutOutline}); }

  ngOnInit() {
    this.titleService.getTitle().subscribe(title => this.title = title);
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Log Out',
          handler: async () => {
            await this.storageService.removeItem('login');
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }
}
