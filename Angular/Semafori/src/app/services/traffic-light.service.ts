import { Injectable, signal } from '@angular/core';

export interface TrafficLight {
  id: string;
  name: string;
  location: string;
  status: 'red' | 'amber' | 'green';
  latitude: number;
  longitude: number;
  roadInterruption: {
    km: number;
    startDate: Date;
    estimatedEndDate: Date;
  };
  trafficLevel: number; // 0-100
  vehiclesPassed: number;
  vehiclesPassedRed: number;
  vehiclesPassedAmber: number;
  isFavorite?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TrafficLightService {
  private readonly initialData: TrafficLight[] = [
    {
      id: '1',
      name: 'Semaforo A - Via Roma',
      location: 'Intersezione Via Roma/Via Veneto',
      status: 'green',
      latitude: 41.9028,
      longitude: 12.4964,
      roadInterruption: {
        km: 2.5,
        startDate: new Date('2024-01-15'),
        estimatedEndDate: new Date('2024-02-28')
      },
      trafficLevel: 35,
      vehiclesPassed: 1250,
      vehiclesPassedRed: 45,
      vehiclesPassedAmber: 120,
      isFavorite: true
    },
    {
      id: '2',
      name: 'Semaforo B - Via Nazionale',
      location: 'Intersezione Via Nazionale/Via del Corso',
      status: 'red',
      latitude: 41.9125,
      longitude: 12.5010,
      roadInterruption: {
        km: 1.8,
        startDate: new Date('2024-01-20'),
        estimatedEndDate: new Date('2024-03-10')
      },
      trafficLevel: 72,
      vehiclesPassed: 2150,
      vehiclesPassedRed: 180,
      vehiclesPassedAmber: 340,
      isFavorite: false
    },
    {
      id: '3',
      name: 'Semaforo C - Via delle Terme',
      location: 'Intersezione Via delle Terme/Via Cavour',
      status: 'amber',
      latitude: 41.9045,
      longitude: 12.4880,
      roadInterruption: {
        km: 0.9,
        startDate: new Date('2024-01-25'),
        estimatedEndDate: new Date('2024-02-15')
      },
      trafficLevel: 45,
      vehiclesPassed: 890,
      vehiclesPassedRed: 20,
      vehiclesPassedAmber: 89,
      isFavorite: true
    },
    {
      id: '4',
      name: 'Semaforo D - Via Clementina',
      location: 'Intersezione Via Clementina/Via Sistina',
      status: 'green',
      latitude: 41.8962,
      longitude: 12.5020,
      roadInterruption: {
        km: 1.2,
        startDate: new Date('2024-01-22'),
        estimatedEndDate: new Date('2024-03-05')
      },
      trafficLevel: 28,
      vehiclesPassed: 567,
      vehiclesPassedRed: 12,
      vehiclesPassedAmber: 45,
      isFavorite: false
    }
  ];

  private trafficLights = signal<TrafficLight[]>(this.initialData);

  constructor() {}

  trafficLights$ = this.trafficLights;

  getTrafficLights(): TrafficLight[] {
    return this.trafficLights();
  }

  getTrafficLightById(id: string): TrafficLight | undefined {
    return this.getTrafficLights().find(light => light.id === id);
  }

  updateTrafficLightStatus(id: string, status: 'red' | 'amber' | 'green'): void {
    const lights = this.getTrafficLights();
    const index = lights.findIndex(light => light.id === id);
    if (index !== -1) {
      const updated = [...lights];
      updated[index] = { ...updated[index], status };
      this.trafficLights.set(updated);
    }
  }

  toggleFavorite(id: string): void {
    const lights = this.getTrafficLights();
    const index = lights.findIndex(light => light.id === id);
    if (index !== -1) {
      const updated = [...lights];
      updated[index] = { ...updated[index], isFavorite: !updated[index].isFavorite };
      this.trafficLights.set(updated);
    }
  }

  getFavorites(): TrafficLight[] {
    return this.getTrafficLights().filter(light => light.isFavorite);
  }
}
