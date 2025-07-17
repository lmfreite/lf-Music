import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
 private readonly storageKey = 'dark-mode';

  constructor() {
    this.initTheme();
  }

  // Aplica el tema según la preferencia almacenada o la del sistema
  private initTheme() {
    const saved = localStorage.getItem(this.storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const enableDark = saved === 'true' || (saved === null && prefersDark);
    this.setDarkMode(enableDark);
  }

  // Cambia y almacena la preferencia
  setDarkMode(enable: boolean) {
    document.body.classList.toggle('dark', enable);
    localStorage.setItem(this.storageKey, String(enable));
  }

  // Alterna modo claro/oscuro
  toggle() {
    const isDark = document.body.classList.contains('dark');
    this.setDarkMode(!isDark);
  }

  // Consulta el estado actual
  isDarkMode(): boolean {
    return document.body.classList.contains('dark');
  }
}
