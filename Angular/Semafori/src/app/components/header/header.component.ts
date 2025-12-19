import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header>
      <nav>
        <div class="header-content">
          <!-- Logo -->
          <div class="logo-section" routerLink="/dashboard">
            <div class="logo-icon">
              <span class="logo-emoji">🚦</span>
            </div>
            <span class="logo-text">TrafficFlow</span>
          </div>

          <!-- Desktop Navigation -->
          <div class="nav-links desktop-only">
            <a 
              routerLink="/dashboard" 
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              class="nav-link">
              Dashboard
            </a>
            <a 
              routerLink="/semafori" 
              routerLinkActive="active"
              class="nav-link">
              Semafori
            </a>
            <a 
              routerLink="/profile" 
              routerLinkActive="active"
              class="nav-link">
              Profilo
            </a>
          </div>

          <!-- Desktop User Menu -->
          <div class="user-menu desktop-only">
            <ng-container *ngIf="(authService.isAuthenticated$())">
              <img 
                [src]="(authService.currentUser$())?.avatar" 
                alt="Avatar"
                class="avatar">
              <button 
                (click)="logout()"
                class="btn-logout">
                Esci
              </button>
            </ng-container>
            <ng-container *ngIf="!(authService.isAuthenticated$())">
              <a 
                routerLink="/login"
                class="btn-login">
                Accedi
              </a>
            </ng-container>
          </div>

          <!-- Mobile Menu Button -->
          <button class="mobile-menu-btn" (click)="toggleMenu()">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" *ngIf="!isMenuOpen()">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" *ngIf="isMenuOpen()">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu Dropdown -->
        <div class="mobile-menu" [class.open]="isMenuOpen()">
          <div class="mobile-nav-links">
            <a 
              routerLink="/dashboard" 
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              (click)="closeMenu()"
              class="mobile-nav-link">
              Dashboard
            </a>
            <a 
              routerLink="/semafori" 
              routerLinkActive="active"
              (click)="closeMenu()"
              class="mobile-nav-link">
              Semafori
            </a>
            <a 
              routerLink="/profile" 
              routerLinkActive="active"
              (click)="closeMenu()"
              class="mobile-nav-link">
              Profilo
            </a>
            
            <div class="mobile-user-actions">
              <ng-container *ngIf="(authService.isAuthenticated$())">
                <div class="mobile-user-info">
                   <img [src]="(authService.currentUser$())?.avatar" class="avatar-sm">
                   <span>{{ (authService.currentUser$())?.name }}</span>
                </div>
                <button (click)="logout()" class="mobile-btn-logout">Esci</button>
              </ng-container>
              <ng-container *ngIf="!(authService.isAuthenticated$())">
                <a routerLink="/login" (click)="closeMenu()" class="mobile-btn-login">Accedi</a>
              </ng-container>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
    this.closeMenu();
    this.router.navigate(['/login']);
  }
}
