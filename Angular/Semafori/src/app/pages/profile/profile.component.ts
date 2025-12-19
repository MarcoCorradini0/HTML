import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="profile-page">
      <div class="profile-container">
        <!-- Header -->
        <div class="page-header">
          <h1 class="page-title">Il Tuo Profilo</h1>
          <p class="page-subtitle">Gestisci le tue informazioni e le impostazioni dell'account</p>
        </div>

        <!-- Not Logged In State -->
        <ng-container *ngIf="!authService.isAuthenticated$()">
          <div class="not-logged-card">
            <div class="lock-icon">🔐</div>
            <h2 class="card-title">Accedi per visualizzare il tuo profilo</h2>
            <p class="card-text">Accedi al tuo account per gestire le impostazioni e visualizzare i tuoi dati personali.</p>
            <a routerLink="/login" class="btn-primary">
              Accedi Ora
            </a>
          </div>
        </ng-container>

        <!-- Logged In State -->
        <ng-container *ngIf="authService.isAuthenticated$()">
          <div class="profile-content">
            <!-- Profile Card -->
            <div class="profile-card">
              <div class="cover-photo"></div>
              <div class="profile-info">
                <div class="avatar-section">
                  <img 
                    [src]="authService.currentUser$()?.avatar" 
                    alt="Avatar"
                    class="avatar-img">
                  <div class="user-details">
                    <h2 class="user-name">{{ authService.currentUser$()?.name }}</h2>
                    <p class="user-role-wrapper">
                      <span class="user-role-badge">
                        {{ authService.currentUser$()?.role === 'admin' ? 'Amministratore' : 'Utente' }}
                      </span>
                    </p>
                  </div>
                </div>

                <!-- Profile Info -->
                <div class="info-list">
                  <div>
                    <p class="info-item-label">Email</p>
                    <p class="info-item-value">{{ authService.currentUser$()?.email }}</p>
                  </div>
                  <div>
                    <p class="info-item-label">ID Utente</p>
                    <p class="info-item-value mono">{{ authService.currentUser$()?.id }}</p>
                  </div>
                </div>

                <!-- Admin Only Section -->
                <div *ngIf="authService.currentUser$()?.role === 'admin'" class="admin-section">
                  <h3 class="admin-title">🔐 Accesso Amministratore</h3>
                  <p class="card-text">Come amministratore, hai accesso a:</p>
                  <ul class="admin-list">
                    <li class="admin-list-item">
                      <span class="check-icon">✓</span>
                      Controllo remoto dei semafori
                    </li>
                    <li class="admin-list-item">
                      <span class="check-icon">✓</span>
                      Visualizzazione statistiche avanzate
                    </li>
                    <li class="admin-list-item">
                      <span class="check-icon">✓</span>
                      Gestione utenti e permessi
                    </li>
                    <li class="admin-list-item">
                      <span class="check-icon">✓</span>
                      Accesso ai report completi
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Settings Card -->
            <div class="settings-card">
              <h3 class="settings-title">⚙️ Impostazioni</h3>
              <div class="settings-list">
                <div class="setting-item">
                  <div>
                    <p class="setting-label">Notifiche Desktop</p>
                    <p class="setting-desc">Ricevi avvisi per i cambi di stato</p>
                  </div>
                  <input type="checkbox" class="checkbox" checked>
                </div>
                <div class="setting-item">
                  <div>
                    <p class="setting-label">Email Giornaliere</p>
                    <p class="setting-desc">Ricevi un riepilogo giornaliero</p>
                  </div>
                  <input type="checkbox" class="checkbox">
                </div>
              </div>
            </div>

            <!-- Danger Zone -->
            <div class="danger-card">
              <h3 class="danger-title">⚠️ Zona Pericolosa</h3>
              <button 
                (click)="logout()"
                class="btn-danger">
                Esci dal tuo Account
              </button>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
