import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrafficLightService, TrafficLight } from '../../services/traffic-light.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-page">
      <div class="dashboard-container">
        <!-- Header -->
        <div class="page-header">
          <h1 class="page-title">Dashboard Controllo Traffico</h1>
          <p class="page-subtitle">Gestione semafori e monitoraggio in tempo reale durante i lavori stradali</p>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
          <div class="stat-card green">
            <div class="stat-content">
              <div>
                <p class="stat-label">Semafori Attivi</p>
                <p class="stat-value">{{ trafficLights().length }}</p>
              </div>
              <div class="stat-icon">🟢</div>
            </div>
          </div>

          <div class="stat-card red">
            <div class="stat-content">
              <div>
                <p class="stat-label">Traffico Critico</p>
                <p class="stat-value">{{ criticalTrafficCount() }}</p>
              </div>
              <div class="stat-icon">⚠️</div>
            </div>
          </div>

          <div class="stat-card blue">
            <div class="stat-content">
              <div>
                <p class="stat-label">Strada Interrotta</p>
                <p class="stat-value">
                  {{ totalInterruptedKm() | number: '1.1-1' }} km
                </p>
              </div>
              <div class="stat-icon">📍</div>
            </div>
          </div>

          <div class="stat-card yellow">
            <div class="stat-content">
              <div>
                <p class="stat-label">Preferiti</p>
                <p class="stat-value">{{ favorites().length }}</p>
              </div>
              <div class="stat-icon">⭐</div>
            </div>
          </div>
        </div>

        <!-- Traffic Lights Grid -->
        <div class="lights-grid">
          <div *ngFor="let light of trafficLights()" class="light-card">
            
            <!-- Status Badge -->
            <div [ngClass]="{
              'green': light.status === 'green',
              'red': light.status === 'red',
              'amber': light.status === 'amber'
            }" class="status-stripe"></div>

            <div class="card-content">
              <!-- Header -->
              <div class="card-header-row">
                <div>
                  <h3 class="light-name">{{ light.name }}</h3>
                  <p class="light-location">📍 {{ light.location }}</p>
                </div>
                <button 
                  (click)="toggleFavorite(light.id)"
                  [ngClass]="{
                    'active': light.isFavorite,
                    'inactive': !light.isFavorite
                  }"
                  class="btn-favorite">
                  ★
                </button>
              </div>

              <!-- Status Display -->
              <div class="status-display-row">
                <div class="status-flex">
                  <div [ngClass]="{
                    'green': light.status === 'green',
                    'red': light.status === 'red',
                    'amber': light.status === 'amber'
                  }" class="status-circle">
                    <span [ngClass]="{
                      'green': light.status === 'green',
                      'red': light.status === 'red',
                      'amber': light.status === 'amber'
                    }">
                      {{ light.status === 'green' ? '✓' : light.status === 'red' ? '■' : '◆' }}
                    </span>
                  </div>
                  <div>
                    <p class="status-text-label">Stato attuale</p>
                    <p class="status-text-value" [ngClass]="{
                      'green': light.status === 'green',
                      'red': light.status === 'red',
                      'amber': light.status === 'amber'
                    }">
                      {{ light.status === 'green' ? 'Verde' : light.status === 'red' ? 'Rosso' : 'Arancione' }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Info Grid -->
              <div class="info-grid">
                <div>
                  <p class="info-label">Strada Interrotta</p>
                  <p class="info-value blue">{{ light.roadInterruption.km }} km</p>
                </div>
                <div>
                  <p class="info-label">Livello Traffico</p>
                  <div class="traffic-bar-container">
                    <div class="traffic-bar-bg">
                      <div 
                        [style.width]="light.trafficLevel + '%'"
                        [ngClass]="{
                          'green': light.trafficLevel < 40,
                          'yellow': light.trafficLevel >= 40 && light.trafficLevel < 70,
                          'red': light.trafficLevel >= 70
                        }"
                        class="traffic-bar-fill"></div>
                    </div>
                    <span class="traffic-value">{{ light.trafficLevel }}%</span>
                  </div>
                </div>
                <div>
                  <p class="info-label">Data Fine Lavori</p>
                  <p class="info-value default">
                    {{ light.roadInterruption.estimatedEndDate | date: 'dd MMM yyyy' }}
                  </p>
                </div>
                <div>
                  <p class="info-label">Giorni Rimasti</p>
                  <p class="info-value orange">{{ getDaysRemaining(light.roadInterruption.estimatedEndDate) }}d</p>
                </div>
              </div>

              <!-- Statistics -->
              <div class="stats-mini-grid">
                <div class="stat-mini-box blue">
                  <p class="stat-mini-label">Auto Transitate</p>
                  <p class="stat-mini-value blue">{{ light.vehiclesPassed }}</p>
                </div>
                <div class="stat-mini-box red">
                  <p class="stat-mini-label">Transitate Rosso</p>
                  <p class="stat-mini-value red">{{ light.vehiclesPassedRed }}</p>
                </div>
                <div class="stat-mini-box yellow">
                  <p class="stat-mini-label">Transitate Arancione</p>
                  <p class="stat-mini-value yellow">{{ light.vehiclesPassedAmber }}</p>
                </div>
              </div>

              <!-- Admin Controls -->
              <div *ngIf="isAdmin()" class="admin-controls">
                <p class="admin-label">Controllo Remoto (Admin)</p>
                <div class="admin-buttons">
                  <button 
                    (click)="updateStatus(light.id, 'green')"
                    [ngClass]="{'active': light.status === 'green'}"
                    class="btn-control green">
                    Verde
                  </button>
                  <button 
                    (click)="updateStatus(light.id, 'amber')"
                    [ngClass]="{'active': light.status === 'amber'}"
                    class="btn-control yellow">
                    Arancione
                  </button>
                  <button 
                    (click)="updateStatus(light.id, 'red')"
                    [ngClass]="{'active': light.status === 'red'}"
                    class="btn-control red">
                    Rosso
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Data State -->
        <div *ngIf="trafficLights().length === 0" class="no-data">
          <p>Nessun semaforo disponibile</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private trafficLightService = inject(TrafficLightService);
  private authService = inject(AuthService);

  trafficLights = this.trafficLightService.trafficLights$;

  criticalTrafficCount = computed(() => {
    return this.trafficLights().filter((t: TrafficLight) => t.trafficLevel > 60).length;
  });

  totalInterruptedKm = computed(() => {
    return this.trafficLights().reduce((sum: number, light: TrafficLight) => sum + light.roadInterruption.km, 0);
  });

  favorites = computed(() => {
    return this.trafficLights().filter(light => light.isFavorite);
  });

  getDaysRemaining(endDate: Date): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    const diffTime = end.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  toggleFavorite(id: string): void {
    this.trafficLightService.toggleFavorite(id);
  }

  updateStatus(id: string, status: 'red' | 'amber' | 'green'): void {
    if (this.isAdmin()) {
      this.trafficLightService.updateTrafficLightStatus(id, status);
    }
  }
}
