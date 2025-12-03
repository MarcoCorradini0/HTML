export interface Exercise {
  id: number;
  name: string;
  muscleGroup: string; // per ora semplice stringa: 'petto', 'schiena', ecc.
  sets: number;
  reps: number;
  weightKg?: number;
  notes?: string;
}