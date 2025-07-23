import { Injectable } from '@angular/core';
import { ILogin } from 'src/app/interfaces/ILogin';
import { Observable, of } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _storageService: StorageService) { }

  loginUser(data: ILogin): Observable<boolean> {
    const validEmail = 'lmfreite@gmail.com';
    const validPassword = 'Colombia2024*';

    if (data.email === validEmail && data.password === validPassword) {
      this._storageService.setItem('login', 'true');
      return of(true);
    } else {
      return of(false);
    }
  }
}
