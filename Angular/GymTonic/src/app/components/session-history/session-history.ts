import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../services/training';

@Component({
  selector: 'app-session-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-history.html',
  styleUrl: './session-history.css'
})
export class SessionHistory {
  private trainingService = inject(TrainingService);
  sessions = this.trainingService.sessions;

  expandedSessionId: string | null = null;

  toggleDetails(id: string) {
    if (this.expandedSessionId === id) {
      this.expandedSessionId = null;
    } else {
      this.expandedSessionId = id;
    }
  }

  getTotalVolume(session: any): number {
    let vol = 0;
    session.exercises.forEach((ex: any) => {
      ex.exercisesSets.forEach((set: any) => {
        vol += (set.weightKg || 0) * (set.reps || 0);
      });
    });
    return vol;
  }
}
