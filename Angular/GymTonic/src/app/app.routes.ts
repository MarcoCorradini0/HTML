import { Routes } from '@angular/router';
import { LandingPage } from './components/landing-page/landing-page';
import { ExerciseList } from './components/exercise-list/exercise-list';
import { SessionCreate } from './components/session-create/session-create';
import { SessionHistory } from './components/session-history/session-history';
import { ProgressTracker } from './components/progress-tracker/progress-tracker';
import { SessionTemplates } from './components/session-templates/session-templates';

export const routes: Routes = [
    { path: '', component: LandingPage },
    { path: 'exercises', component: ExerciseList },
    { path: 'session/new', component: SessionCreate },
    { path: 'session/history', component: SessionHistory },
    { path: 'session/templates', component: SessionTemplates },
    { path: 'progress', component: ProgressTracker },
];
