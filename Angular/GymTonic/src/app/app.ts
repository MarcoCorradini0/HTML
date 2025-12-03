import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Exercise } from './models/exercise';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gym-app');
  
  exercises: Exercise[] = [
  {
    id: 1,
    name: 'Panca piana con bilanciere',
    muscleGroup: 'petto',
    sets: 3,
    reps: 8,
    weightKg: 50,
    notes: 'Focus sulla tecnica, niente rimbalzi'
  },
  {
    id: 2,
    name: 'Lat machine avanti',
    muscleGroup: 'schiena',
    sets: 3,
    reps: 10,
    weightKg: 40,
    notes: 'Tirare al petto senza slanci'
  },
  {
    id: 3,
    name: 'Squat al multipower',
    muscleGroup: 'gambe',
    sets: 4,
    reps: 8,
    weightKg: 60,
    notes: 'Scendere almeno a parallelo'
  },
  {
    id: 4,
    name: 'Curl manubri in piedi',
    muscleGroup: 'bicipiti',
    sets: 3,
    reps: 12,
    weightKg: 10
  },
  {
    id: 5,
    name: 'French press bilanciere EZ',
    muscleGroup: 'tricipiti',
    sets: 3,
    reps: 10,
    weightKg: 25
  },
  {
    id: 6,
    name: 'Plank',
    muscleGroup: 'core',
    sets: 3,
    reps: 30,
    notes: '30 secondi a serie'
  }
];

  insertExercise() {
    console.log('Inserisci nuovo esercizio');
    alert('Funzione INSERISCI - Da implementare! 🎉');
  }

  editExercise(id: number) {
    console.log('Modifica esercizio con id:', id);
    alert(`Funzione MODIFICA per esercizio ID ${id} - Da implementare! ✏️`);
  }

  deleteExercise(id: number) {
    console.log('Elimina esercizio con id:', id);
    const confirmed = confirm(`Sei sicuro di voler eliminare questo esercizio? 🗑️`);
    if (confirmed) {
      this.exercises = this.exercises.filter(ex => ex.id !== id);
      alert('Esercizio eliminato! ✅');
    }
  }

}
