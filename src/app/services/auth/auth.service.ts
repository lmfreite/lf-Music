import { Injectable } from '@angular/core';
import { ILoginUser } from 'src/app/interfaces/ILoginUser';
import { Observable, from } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { ILogin } from 'src/app/interfaces/ILogin';
import { ILoginResponse } from 'src/app/interfaces/ILoginResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.apiUrl;
  

  constructor(private _storageService: StorageService) { }

  loginUser(data: ILoginUser): Observable<boolean> {
    return from(this.validateUser(data));
  }

  private async validateUser(data: ILoginUser): Promise<boolean> {
    const usuariosStr = await this._storageService.getItem('usuarios');
    if (!usuariosStr) {
      return false;
    }
    const usuarios = JSON.parse(usuariosStr);
    const usuario = usuarios.find((u: any) => u.email === data.email && u.password === data.password);
    if (usuario) {
      await this._storageService.setItem('login', 'true');
      return true;
    } else {
      return false;
    }
  }

  login(data: ILogin): Observable<boolean> {
    return from(
      fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
        .then(async response => {
          if (!response.ok) {
            throw new Error('Error en el login');
          }
          const result = await response.json();
          console.log('Login Response:', result);
          await this._storageService.setItem('login', 'true');
          return true;
        })
        .catch(error => {
          console.error('Error en login:', error);
          return false;
        })
    );
  }

  
}
