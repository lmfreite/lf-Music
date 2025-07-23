import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { PasswordValidator } from '../validators/password.validator';
import { RegisterService } from '../services/register/register.service';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ReactiveFormsModule],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        lastname: ['', [Validators.required, Validators.minLength(2)]],
        email: [
          '',
          [Validators.required, Validators.email, Validators.minLength(6)],
        ],
        password: ['', [Validators.required, PasswordValidator]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  ngOnInit() {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color: 'primary',
    });
    await toast.present();
  }

  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // Métodos para verificar errores
  get emailErrors() {
    const control = this.registerForm.get('email');
    return control?.errors && control?.touched;
  }

  get passwordErrors() {
    const control = this.registerForm.get('password');
    return control?.errors && control?.touched;
  }

  get nameErrors() {
    const control = this.registerForm.get('name');
    return control?.errors && control?.touched;
  }

  get lastnameErrors() {
    const control = this.registerForm.get('lastname');
    return control?.errors && control?.touched;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;
      this.registerService.registerUser(registerData).subscribe({
        next: (result) => {
          if (result === true) {
            this.navCtrl.navigateForward('/login');
            this.presentToast('Registro exitoso');
          } else if (result === 'email-exists') {
            this.presentToast('El email ya está registrado');
          }
        },
        error: () => {
          this.presentToast('Error en el registro');
        },
      });
    }
  }
}
