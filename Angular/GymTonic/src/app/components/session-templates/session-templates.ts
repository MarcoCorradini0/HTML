import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainingService } from '../../services/training';
import { SessionTemplate } from '../../models/exercise';

@Component({
  selector: 'app-session-templates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './session-templates.html',
  styleUrl: './session-templates.css'
})
export class SessionTemplates {
  private trainingService = inject(TrainingService);
  private router = inject(Router);

  templates = this.trainingService.templates;
  exercises = this.trainingService.exercises;

  // Form State
  isCreating = false;
  newTemplateName = '';
  selectedExerciseIds = signal<(number | string)[]>([]);

  startCreating() {
    this.isCreating = true;
    this.newTemplateName = '';
    this.selectedExerciseIds.set([]);
  }

  toggleExerciseSelection(id: number | string) {
    this.selectedExerciseIds.update(list =>
      list.includes(id) ? list.filter(x => x !== id) : [...list, id]
    );
  }

  saveTemplate() {
    if (!this.newTemplateName || this.selectedExerciseIds().length === 0) return;

    const newTemplate: SessionTemplate = {
      id: crypto.randomUUID(),
      name: this.newTemplateName,
      exerciseIds: this.selectedExerciseIds()
    };

    this.trainingService.saveTemplate(newTemplate);
    this.isCreating = false;
  }

  deleteTemplate(id: string) {
    if (confirm('Delete this routine?')) {
      this.trainingService.deleteTemplate(id);
    }
  }

  startSessionFromTemplate(template: SessionTemplate) {
    // Navigate to session create with query params to pre-fill
    // Ideally we would use a state service for this handover, but query params/ID is simpler for now
    // Or we handle queryParams in session-create
    this.router.navigate(['/session/new'], { queryParams: { templateId: template.id } });
  }
}
