export interface Exercise {
  id: string | number;
  name: string;
  muscleGroup: string;
  sets: number;
  reps: number;
  weightKg?: number;
  notes?: string;
  mediaUrl?: string; // Image URL or YouTube ID
  instructions?: string;
  isPreset?: boolean; // To distinguish system presets from user custom
}

export interface SessionTemplate {
  id: string; // UUID
  name: string;
  description?: string;
  exerciseIds: (string | number)[]; // Ordered list of exercise IDs
}