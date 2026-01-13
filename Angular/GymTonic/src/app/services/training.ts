import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise, SessionTemplate } from '../models/exercise';
import { TrainingSession } from '../models/session';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private http = inject(HttpClient);
  private readonly EXERCISES_KEY = 'gymtonic_exercises_v3';
  private readonly SESSIONS_KEY = 'gymtonic_sessions_v3';
  private readonly TEMPLATES_KEY = 'gymtonic_templates_v3';

  readonly exercises = signal<Exercise[]>([]);
  readonly sessions = signal<TrainingSession[]>([]);
  readonly templates = signal<SessionTemplate[]>([]);

  constructor() {
    this.loadData();
  }

  private async loadData() {
    // 1. Load External Exercises
    let externalExercises: Exercise[] = [];
    try {
      const data: any[] = await firstValueFrom(this.http.get<any[]>('assets/exercises.json'));
      externalExercises = data.map(e => ({
        id: e.id,
        name: e.name,
        muscleGroup: e.primaryMuscles[0] ? this.capitalize(e.primaryMuscles[0]) : 'Other',
        sets: 3, // Default
        reps: 10, // Default
        isPreset: true,
        instructions: e.instructions?.join(' '),
        mediaUrl: e.images && e.images.length > 0
          ? `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${e.images[0]}`
          : undefined
      }));
    } catch (err) {
      console.error('Failed to load external exercises', err);
    }

    // 2. Load Local Custom Exercises
    const localJson = localStorage.getItem(this.EXERCISES_KEY);
    const localExercises: Exercise[] = localJson ? JSON.parse(localJson) : [];

    // 3. Merge (Local overrides external if ID matches, though IDs should be distinct)
    // We prioritize local custom exercises + external ones.
    // If a local exercise has same ID as external, we use local (user might have customized it).
    // Actually, distinct IDs are better. JSON uses strings, we use timestamps for new ones.

    // Combine: Local Custom First, then External
    // Filter duplicates by ID just in case
    const combined = [...localExercises];
    const localIds = new Set(localExercises.map(e => e.id));
    externalExercises.forEach(ex => {
      if (!localIds.has(ex.id)) {
        combined.push(ex);
      }
    });

    this.exercises.set(combined);

    // Load Sessions & Templates
    const sessionsJson = localStorage.getItem(this.SESSIONS_KEY);
    if (sessionsJson) {
      this.sessions.set(JSON.parse(sessionsJson));
    }

    const templatesJson = localStorage.getItem(this.TEMPLATES_KEY);
    if (templatesJson) {
      this.templates.set(JSON.parse(templatesJson));
    }
  }

  private capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // --- Exercises ---
  saveCustomExercise(exercise: Exercise) {
    // Get current local exercises
    const localJson = localStorage.getItem(this.EXERCISES_KEY);
    const local: Exercise[] = localJson ? JSON.parse(localJson) : [];

    // Add new one
    local.push(exercise);

    // Save to local storage
    localStorage.setItem(this.EXERCISES_KEY, JSON.stringify(local));

    // Update signal
    this.exercises.update(list => [exercise, ...list]);
  }

  deleteExercise(id: string | number) {
    // Only delete from local storage if it's there
    const localJson = localStorage.getItem(this.EXERCISES_KEY);
    if (localJson) {
      const local = JSON.parse(localJson) as Exercise[];
      const newLocal = local.filter(e => e.id !== id);
      localStorage.setItem(this.EXERCISES_KEY, JSON.stringify(newLocal));
    }

    // Update signal (removes from view even if it was external, technically re-appearing on reload if not persisted "deletion of external"...)
    // For now, valid for custom exercises. Hiding external ones is a future feature.
    this.exercises.update(list => list.filter(e => e.id !== id));
  }

  generateId(): string {
    return 'custom_' + Date.now();
  }

  // --- Templates ---
  saveTemplate(template: SessionTemplate) {
    this.templates.update(list => [...list, template]);
    this.saveTemplates();
  }

  saveTemplates() {
    localStorage.setItem(this.TEMPLATES_KEY, JSON.stringify(this.templates()));
  }

  deleteTemplate(id: string) {
    this.templates.update(list => list.filter(t => t.id !== id));
    this.saveTemplates();
  }

  // --- Sessions ---
  saveSession(session: TrainingSession) {
    this.sessions.update(list => [session, ...list]);
    localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(this.sessions()));
  }

  // --- Analytics Helper ---
  getTotalWorkouts() {
    return this.sessions().length;
  }
}
