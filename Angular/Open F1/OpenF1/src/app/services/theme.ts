import { inject, Injectable, signal } from '@angular/core';
import { PrimeNG } from 'primeng/config';

@Injectable({
  providedIn: 'root'
})
export class Theme {
  private readonly primeNG = inject(PrimeNG);
  private readonly isDarkTheme = signal(false);
 
  constructor() {
    // Controlla se c'è una preferenza salvata nel localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkTheme.set(savedTheme === 'dark');
    } else {
      // Usa la preferenza del sistema se non c'è una preferenza salvata
      this.isDarkTheme.set(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
   
    // Applica il tema iniziale
    this.applyTheme();
  }
 
  get isDark() {
    return this.isDarkTheme.asReadonly();
  }
 
  toggleTheme() {
    this.isDarkTheme.update(current => !current);
    this.applyTheme();
    this.saveThemePreference();
  }
 
  setTheme(isDark: boolean) {
    this.isDarkTheme.set(isDark);
    this.applyTheme();
    this.saveThemePreference();
  }
 
  private applyTheme() {
    this.primeNG.theme.set({
      preset: 'Aura',
      options: {
        darkModeSelector: this.isDarkTheme() ? '.dark' : ''
      }
    });
 
    // Aggiunge o rimuove la classe 'dark' dal document
    if (this.isDarkTheme()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
 
  private saveThemePreference() {
    localStorage.setItem('theme', this.isDarkTheme() ? 'dark' : 'light');
  }
}
