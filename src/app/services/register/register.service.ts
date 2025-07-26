import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Observable, from } from 'rxjs';
import { IRegisterUser } from 'src/app/interfaces/IRegisterUser';
import { environment } from 'src/environments/environment';
import { IRegister } from 'src/app/interfaces/IRegister';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl: string = environment.apiUrl;
  

  constructor(private _storageService: StorageService) { }

  registerUser(data: IRegisterUser): Observable<boolean | 'email-exists'> {
    return from(this.saveUser(data));
  }

  private async saveUser(data: IRegisterUser): Promise<boolean | 'email-exists'> {
    const nuevoUsuario = {
      nombre: data.name,
      apellido: data.last_name,
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

  register(data: IRegister): Observable<boolean | 'email-exists'> {
    return from(
      fetch(`${environment.apiUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
        .then(async response => {
          if (!response.ok) {
            if (response.status === 409) { // Conflict, email already exists
              return 'email-exists';
            }
            throw new Error('Error en el registro');
          }
          const result = await response.json();
          console.log('Register Response:', result);
          return true;
        })
        .catch(error => {
          console.error('Error en registro:', error);
          return false;
        })
    );
  }
}
