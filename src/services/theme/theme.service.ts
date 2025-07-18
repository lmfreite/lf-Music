import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'dark-mode';

  constructor(private _storageService: StorageService) {}

  async init() {
    let saved = await this._storageService.getItem(this.storageKey);
    if (saved === null) {
      saved = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'true'
        : 'false';
      await this._storageService.setItem(this.storageKey, saved);
    }
    const enableDark = saved === 'true';
    document.body.classList.toggle('dark', enableDark);
  }

  // Cambia y almacena la preferencia
  async setDarkMode(enable: boolean): Promise<void> {
    document.body.classList.toggle('dark', enable);
    await this._storageService.setItem(this.storageKey, String(enable));
  }

  // Alterna modo claro/oscuro
  async toggle(): Promise<void> {
    const isDark = document.body.classList.contains('dark');
    await this.setDarkMode(!isDark);
  }

  // Consulta el estado actual
  isDarkMode(): boolean {
    return document.body.classList.contains('dark');
  }
}
