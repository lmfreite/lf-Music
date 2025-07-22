import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { PasswordValidator } from '../validators/password.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonContent]
})
export class LoginPage implements OnInit {
  
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, PasswordValidator]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login data:', { email, password });
    } else {
      console.log('Formulario inválido');
      this.loginForm.markAllAsTouched();
    }
  }

  // Métodos para verificar errores
  get emailErrors() {
    const control = this.loginForm.get('email');
    return control?.errors && control?.touched;
  }

  get passwordErrors() {
    const control = this.loginForm.get('password');
    return control?.errors && control?.touched;
  }
}
