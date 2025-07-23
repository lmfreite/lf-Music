import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Observable, from } from 'rxjs';
import { IRegister } from 'src/app/interfaces/IRegister';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _storageService: StorageService) { }

  registerUser(data: IRegister): Observable<boolean | 'email-exists'> {
    return from(this.saveUser(data));
  }

  private async saveUser(data: IRegister): Promise<boolean | 'email-exists'> {
    const nuevoUsuario = {
      nombre: data.name,
      apellido: data.lastname,
      email: data.email,
      password: data.password
    };

    // Obtener usuarios existentes
    const usuariosStr = await this._storageService.getItem('usuarios');
    let usuarios = [];
    if (usuariosStr) {
      usuarios = JSON.parse(usuariosStr);
    }

    // Verificar si el email ya está registrado
    const existe = usuarios.some((u: any) => u.email === nuevoUsuario.email);
    if (existe) {
      return 'email-exists';
    }

    // Agregar el nuevo usuario
    usuarios.push(nuevoUsuario);

    // Guardar el array actualizado
    await this._storageService.setItem('usuarios', JSON.stringify(usuarios));
    return true;
  }
}
