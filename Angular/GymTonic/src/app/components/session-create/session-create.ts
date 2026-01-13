import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainingService } from '../../services/training';
import { SessionExercise, ExerciseSet } from '../../models/session';

type SessionState = 'SETUP' | 'ACTIVE' | 'SUMMARY';
type ExerciseState = 'IDLE' | 'WORKING' | 'RESTING' | 'FEEDBACK';

@Component({
  selector: 'app-active-session',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './session-create.html',
  styleUrl: './session-create.css'
})
export class SessionCreate {
  private trainingService = inject(TrainingService);
  public router = inject(Router);

  exercises = this.trainingService.exercises;

  // Overall Workflow State
  sessionState: SessionState = 'SETUP';

  // Data
  sessionDate = new Date().toISOString().substring(0, 10);
  sessionName = 'My Workout';
  activeExercises = signal<SessionExercise[]>([]);

  // Active Playback State
  currentExerciseIndex = 0;
  currentSetIndex = 0;
  exerciseState: ExerciseState = 'IDLE';

  // Timers
  workTimerSeconds = 0;
  workInterval: any = null;

  restTimerSeconds = 0;
  restInterval: any = null;

  // Selected for add
  selectedExerciseId: string | number | null = null;
  sessionStartTime = 0;
  sessionDuration = '0:00';

  constructor() {
    const tid = this.router.parseUrl(this.router.url).queryParams['templateId'];
    if (tid) this.loadTemplate(tid);
  }

  loadTemplate(id: string) {
    const tmpl = this.trainingService.templates().find(t => t.id === id);
    if (!tmpl) return;
    this.sessionName = tmpl.name;
    tmpl.exerciseIds.forEach(eid => this.addExerciseById(eid));
  }

  // --- Setup Phase ---
  addExerciseById(id: string | number) {
    const def = this.exercises().find(e => e.id == id);
    if (!def) return;

    const newSessionExercise: SessionExercise = {
      exerciseId: def.id,
      name: def.name,
      exercisesSets: [],
      notes: '',
      userRating: 0,
      durationSeconds: 0
    };

    for (let i = 0; i < def.sets; i++) {
      newSessionExercise.exercisesSets.push({
        reps: def.reps,
        weightKg: def.weightKg || 0,
        completed: false
      });
    }
    this.activeExercises.update(list => [...list, newSessionExercise]);
  }

  addExercise() {
    if (!this.selectedExerciseId) return;
    this.addExerciseById(this.selectedExerciseId);
    this.selectedExerciseId = null;
  }

  removeExercise(index: number) {
    this.activeExercises.update(list => list.filter((_, i) => i !== index));
  }

  startWorkout() {
    if (this.activeExercises().length === 0) {
      alert('Add exercises first!');
      return;
    }
    this.sessionState = 'ACTIVE';
    this.currentExerciseIndex = 0;
    this.currentSetIndex = 0;
    this.exerciseState = 'IDLE';
    this.sessionStartTime = Date.now();
  }

  // --- Active Player Logic ---

  get currentExercise() {
    return this.activeExercises()[this.currentExerciseIndex];
  }

  // --- Active Monitor ---
  startSet() {
    this.exerciseState = 'WORKING';
    // TODO: Track start time of specific set if needed

    this.workTimerSeconds = 0;
    this.workInterval = setInterval(() => {
      this.workTimerSeconds++;
    }, 1000);
  }

  finishSet() {
    clearInterval(this.workInterval);
    const ex = this.currentExercise;
    const set = ex.exercisesSets[this.currentSetIndex];
    if (set) {
      set.completed = true;
      // We could store the actual time taken per set here if we expanded the model
    }

    this.exerciseState = 'RESTING';

    // Auto-start rest timer
    this.restTimerSeconds = 0;
    this.restInterval = setInterval(() => {
      this.restTimerSeconds++;
    }, 1000);
  }

  nextSet() {
    clearInterval(this.restInterval);
    if (this.currentSetIndex < this.currentExercise.exercisesSets.length - 1) {
      this.currentSetIndex++;
      this.exerciseState = 'IDLE';
      this.workTimerSeconds = 0;
    } else {
      this.finishExercise();
    }
  }

  finishExercise() {
    this.exerciseState = 'FEEDBACK';

  }

  rateExercise(stars: number) {
    this.currentExercise.userRating = stars;
  }

  confirmExerciseCompletion() {
    if (this.currentExerciseIndex < this.activeExercises().length - 1) {
      this.currentExerciseIndex++;
      this.currentSetIndex = 0;
      this.exerciseState = 'IDLE';
      this.workTimerSeconds = 0;
    } else {
      this.finishSession();
    }
  }

  nextExercise() {
    this.confirmExerciseCompletion();
  }

  skipRest() {
    this.nextSet();
  }

  finishSession() {
    clearInterval(this.workInterval);
    clearInterval(this.restInterval);

    const session = {
      id: crypto.randomUUID(),
      date: this.sessionDate,
      name: this.sessionName,
      exercises: this.activeExercises()
    };

    this.trainingService.saveSession(session);

    // Calculate final duration
    const durationMs = Date.now() - this.sessionStartTime;
    const mins = Math.floor(durationMs / 60000);
    this.sessionDuration = `${mins}m`;

    this.sessionState = 'SUMMARY';
  }

  // --- Formatting ---
  formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  getMediaUrl(exId: string | number) { return this.trainingService.exercises().find(e => e.id === exId)?.mediaUrl; }
  getInstructions(exId: string | number) { return this.trainingService.exercises().find(e => e.id === exId)?.instructions; }

  toggleSetComplete(set: ExerciseSet) {
    set.completed = !set.completed;
  }
}
