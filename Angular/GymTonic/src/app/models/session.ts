// src/app/models/session.ts

export interface ExerciseSet {
    reps: number;
    weightKg: number;
    completed?: boolean;
}

export interface SessionExercise {
    exerciseId: string | number;
    name: string;
    exercisesSets: ExerciseSet[];
    notes?: string;

    // Advanced Tracking
    startTime?: number; // timestamp
    endTime?: number;   // timestamp
    durationSeconds?: number;
    userRating?: number; // 1-5 Stars
}

export interface TrainingSession {
    id: string; // UUID or timestamp
    date: string; // ISO string
    name: string; // e.g., "Monday Chest Day"
    exercises: SessionExercise[];
}
