import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonContent]
})
export class LoginPage implements OnInit {
  
  loginForm: FormGroup;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private _storageService: StorageService
  ) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color: 'primary'
    });
    await toast.present();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this._authService.loginUser(loginData).subscribe({
        next: async (success) => {
          if (success) {
            const introSeen = await this._storageService.getItem('introSeen');
            if (introSeen === 'true') {
              this.navCtrl.navigateForward('/app/home');
            } else {
              this.navCtrl.navigateForward('/intro');
            }
            this.presentToast('Inicio de sesión exitoso');
          } else {
            this.presentToast('Credenciales inválidas');
          }
        },
        error: () => {
          this.presentToast('Error en el inicio de sesión');
        }
      });
    } 
  }

  // Métodos para verificar errores
  get emailErrors() {
    const control = this.loginForm.get('email');
    return control?.errors && control?.touched;
  }
}
