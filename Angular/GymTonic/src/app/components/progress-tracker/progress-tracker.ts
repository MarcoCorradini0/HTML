import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrainingService } from '../../services/training';

@Component({
  selector: 'app-progress-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './progress-tracker.html',
  styleUrl: './progress-tracker.css'
})
export class ProgressTracker {
  private trainingService = inject(TrainingService);

  exercises = this.trainingService.exercises;
  sessions = this.trainingService.sessions;

  selectedExerciseId = signal<number | null>(null);

  // Computed signal to get progress data for selected exercise
  progressData = computed(() => {
    const exId = this.selectedExerciseId();
    if (!exId) return [];

    return this.sessions()
      .map(session => {
        const didExercise = session.exercises.find(e => e.exerciseId == exId);
        if (!didExercise) return null;

        const maxWeight = Math.max(...didExercise.exercisesSets.map(s => s.weightKg || 0));
        const totalReps = didExercise.exercisesSets.reduce((acc, s) => acc + (s.reps || 0), 0);
        const bestSet = didExercise.exercisesSets.reduce((prev, current) => (prev.weightKg > current.weightKg) ? prev : current, { weightKg: 0, reps: 0 });

        return {
          date: session.date,
          maxWeight,
          bestSet: `${bestSet.weightKg}kg x ${bestSet.reps}`,
          totalReps
        };
      })
      .filter(x => x !== null)
      .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()); // Newest first
  });
}
