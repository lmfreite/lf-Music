import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private title$ = new BehaviorSubject<string>('Home');

  constructor() { }

  setTitle(title: string) {
    this.title$.next(title);
  }

  getTitle() {
    return this.title$.asObservable();
  }
}
