import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrainingService } from '../../services/training';
import { Exercise } from '../../models/exercise';

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exercise-list.html',
  styleUrl: './exercise-list.css'
})
export class ExerciseList {
  private trainingService = inject(TrainingService);
  exercises = this.trainingService.exercises;

  newExercise: Partial<Exercise> = {
    name: '',
    muscleGroup: 'Chest',
    sets: 3,
    reps: 10,
    weightKg: 0
  };

  createExercise() {
    if (!this.newExercise.name) {
      alert('Please enter a name');
      return;
    }

    const newEx: Exercise = {
      id: this.trainingService.generateId(),
      name: this.newExercise.name!,
      muscleGroup: this.newExercise.muscleGroup || 'Other',
      sets: this.newExercise.sets || 3,
      reps: this.newExercise.reps || 10,
      weightKg: this.newExercise.weightKg,
      isPreset: false
    };

    this.trainingService.saveCustomExercise(newEx);

    // Reset
    this.newExercise = {
      name: '',
      muscleGroup: 'Chest',
      sets: 3,
      reps: 10,
      weightKg: 0
    };
  }

  deleteExercise(id: string | number) {
    if (confirm('Eliminare questo esercizio?')) {
      this.trainingService.deleteExercise(id);
    }
  }
}
