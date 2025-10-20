import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Theme {
  private readonly isDarkTheme = signal<boolean>(false);

  constructor() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.isDarkTheme.set(true);
    } else if (saved === 'light') {
      this.isDarkTheme.set(false);
    } else {
      // fallback: respect system preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkTheme.set(prefersDark);
    }
    this.applyTheme();
  }

  get isDark() {
    return this.isDarkTheme.asReadonly();
  }

  toggleTheme() {
    this.isDarkTheme.update(v => !v);
    this.applyTheme();
    this.saveThemePreference();
  }

  setTheme(isDark: boolean) {
    this.isDarkTheme.set(isDark);
    this.applyTheme();
    this.saveThemePreference();
  }

  private applyTheme() {
    const el = document.documentElement;
    if (this.isDarkTheme()) {
      el.classList.add('dark');
    } else {
      el.classList.remove('dark');
    }
  }

  private saveThemePreference() {
    localStorage.setItem('theme', this.isDarkTheme() ? 'dark' : 'light');
  }
}
