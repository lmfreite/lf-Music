import { Injectable } from '@angular/core';
import { ILogin } from 'src/app/interfaces/ILogin';
import { Observable, from } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _storageService: StorageService) { }

  loginUser(data: ILogin): Observable<boolean> {
    return from(this.validateUser(data));
  }

  private async validateUser(data: ILogin): Promise<boolean> {
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
}
