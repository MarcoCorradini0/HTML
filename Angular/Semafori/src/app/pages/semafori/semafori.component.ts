import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrafficLightService, TrafficLight } from '../../services/traffic-light.service';

@Component({
  selector: 'app-semafori',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="content-wrapper">
        <!-- Header -->
        <div class="header">
          <h1 class="header-title">Gestione Semafori</h1>
          <p class="header-desc">Visualizza e gestisci i tuoi semafori preferiti e verifica lo stato in tempo reale</p>
        </div>

        <!-- Tabs -->
        <div class="tabs">
          <button 
            (click)="filterMode = 'all'"
            [ngClass]="filterMode === 'all' ? 'active' : 'inactive'"
            class="tab-btn">
            Tutti i Semafori ({{ allTrafficLights().length }})
          </button>
          <button 
            (click)="filterMode = 'favorites'"
            [ngClass]="filterMode === 'favorites' ? 'active' : 'inactive'"
            class="tab-btn">
            Preferiti ({{ favorites().length }})
          </button>
        </div>

        <!-- Traffic Light List -->
        <div class="list-container">
          <div 
            *ngFor="let light of displayedTrafficLights()"
            class="light-item">
            
            <div [ngClass]="{
              'green': light.status === 'green',
              'red': light.status === 'red',
              'amber': light.status === 'amber'
            }" class="status-bar"></div>

            <div class="item-content">
              <div class="item-header">
                <div class="item-info">
                  <h3 class="item-title">{{ light.name }}</h3>
                  <p class="item-loc">📍 {{ light.location }}</p>
                </div>
                <div class="item-actions">
                  <div class="status-wrapper">
                    <p class="status-label">Stato</p>
                    <div [ngClass]="{
                      'green': light.status === 'green',
                      'red': light.status === 'red',
                      'amber': light.status === 'amber'
                    }" class="status-icon-box">
                      <span [ngClass]="{
                        'green': light.status === 'green',
                        'red': light.status === 'red',
                        'amber': light.status === 'amber'
                      }">
                        {{ light.status === 'green' ? '✓' : light.status === 'red' ? '■' : '◆' }}
                      </span>
                    </div>
                    <p class="status-text" [ngClass]="{
                      'green': light.status === 'green',
                      'red': light.status === 'red',
                      'amber': light.status === 'amber'
                    }">
                      {{ light.status === 'green' ? 'Verde' : light.status === 'red' ? 'Rosso' : 'Arancione' }}
                    </p>
                  </div>
                  <button 
                    (click)="toggleFavorite(light.id)"
                    [ngClass]="light.isFavorite ? 'active' : 'inactive'"
                    class="btn-star">
                    ★
                  </button>
                </div>
              </div>

              <!-- Details Grid -->
              <div class="details-grid">
                <div>
                  <p class="detail-label">Strada Interrotta</p>
                  <p class="detail-value blue">{{ light.roadInterruption.km }} km</p>
                </div>
                <div>
                  <p class="detail-label">Livello Traffico</p>
                  <p class="detail-value">{{ light.trafficLevel }}%</p>
                </div>
                <div>
                  <p class="detail-label">Auto Transitate</p>
                  <p class="detail-value blue">{{ light.vehiclesPassed }}</p>
                </div>
                <div>
                  <p class="detail-label">Fine Lavori</p>
                  <p class="detail-value">{{ light.roadInterruption.estimatedEndDate | date:'dd MMM' }}</p>
                </div>
              </div>

              <!-- Statistics -->
              <div class="stats-box-grid">
                <div class="stat-box blue">
                  <p class="stat-box-label">Totale Auto</p>
                  <p class="stat-box-value blue">{{ light.vehiclesPassed }}</p>
                </div>
                <div class="stat-box red">
                  <p class="stat-box-label">Con Rosso</p>
                  <p class="stat-box-value red">{{ light.vehiclesPassedRed }}</p>
                  <p class="stat-box-sub">{{ getPercentage(light.vehiclesPassedRed, light.vehiclesPassed) }}%</p>
                </div>
                <div class="stat-box yellow">
                  <p class="stat-box-label">Con Arancione</p>
                  <p class="stat-box-value yellow">{{ light.vehiclesPassedAmber }}</p>
                  <p class="stat-box-sub">{{ getPercentage(light.vehiclesPassedAmber, light.vehiclesPassed) }}%</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div *ngIf="displayedTrafficLights().length === 0" class="empty-state">
            <p>Nessun semaforo {{ filterMode === 'favorites' ? 'preferito' : 'disponibile' }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./semafori.component.css']
})
export class SemaforiComponent {
  private trafficLightService = inject(TrafficLightService);

  filterMode: 'all' | 'favorites' = 'all';

  allTrafficLights = this.trafficLightService.trafficLights$;

  favorites = computed(() => {
    return this.allTrafficLights().filter(light => light.isFavorite);
  });

  displayedTrafficLights(): TrafficLight[] {
    return this.filterMode === 'favorites' ? this.favorites() : this.allTrafficLights();
  }

  toggleFavorite(id: string): void {
    this.trafficLightService.toggleFavorite(id);
  }

  getPercentage(count: number, total: number): number {
    return total === 0 ? 0 : Math.round((count / total) * 100);
  }
}
