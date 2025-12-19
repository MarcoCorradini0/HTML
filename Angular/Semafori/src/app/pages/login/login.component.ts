import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <div class="login-container">
        <!-- Card -->
        <div class="login-card">
          <!-- Header -->
          <div class="card-header">
            <div class="header-icon">🚦</div>
            <h1 class="header-title">TrafficFlow</h1>
            <p class="header-subtitle">Gestione Semafori</p>
          </div>

          <!-- Form -->
          <div class="card-body">
            <h2 class="body-title">Accedi al tuo Account</h2>
            <p class="body-subtitle">Inserisci le tue credenziali per accedere</p>

            <form (ngSubmit)="onSubmit()">
              <!-- Email Field -->
              <div class="form-group">
                <label class="form-label">Email</label>
                <input 
                  [(ngModel)]="email"
                  name="email"
                  type="email" 
                  placeholder="admin@example.com"
                  class="form-input"
                >
                <p class="form-hint">Demo: admin@example.com</p>
              </div>

              <!-- Password Field -->
              <div class="form-group">
                <label class="form-label">Password</label>
                <input 
                  [(ngModel)]="password"
                  name="password"
                  type="password" 
                  placeholder="••••••••"
                  class="form-input"
                >
                <p class="form-hint">Demo: password</p>
              </div>

              <!-- Error Message -->
              <div *ngIf="error()" class="error-box">
                <p class="error-text">{{ error() }}</p>
              </div>

              <!-- Remember Me -->
              <div class="checkbox-group">
                <input type="checkbox" id="remember" class="checkbox-input">
                <label for="remember" class="checkbox-label">
                  Ricordami su questo dispositivo
                </label>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit"
                [disabled]="loading()"
                class="btn-submit">
                {{ loading() ? 'Accesso in corso...' : 'Accedi' }}
              </button>
            </form>

            <!-- Demo Info -->
            <div class="demo-box">
              <p class="demo-title">📌 Dati di Demo</p>
              <p class="demo-text">Email: <strong>admin@example.com</strong></p>
              <p class="demo-text">Password: <strong>password</strong></p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <p class="footer-text">
          © 2024 TrafficFlow - Gestione Semafori
        </p>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = 'admin@example.com';
  password = 'password';
  loading = signal(false);
  error = signal('');

  async onSubmit(): Promise<void> {
    this.error.set('');
    this.loading.set(true);

    try {
      const success = await this.authService.login(this.email, this.password);

      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error.set('Email o password non corretti');
      }
    } catch (err) {
      this.error.set('Errore durante il login');
    } finally {
      this.loading.set(false);
    }
  }
}
