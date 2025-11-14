import { Component, inject } from '@angular/core';
import { Openf1Service } from '../services/openf1-service';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Meeting } from '../models/meeting';
import { DatePipe } from '@angular/common';
import { Year } from '../models/year';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gran-premi',
  imports: [SelectModule, FormsModule, DatePipe, RouterLink],
  templateUrl: './gran-premi.html',
  styleUrl: './gran-premi.css'
})
export class GranPremi {
  private readonly openf1Service = inject(Openf1Service);

  years: Year[] = [];
  selectedYear = { name: new Date().getFullYear().toString(), code: new Date().getFullYear() };

  meetings: Meeting[] = [];
  async ngOnInit() {
    this.loadYears();
    this.loadMeetings();
  }

  async loadMeetings() {
    this.meetings = await this.openf1Service.getMeetings(this.selectedYear.code);
  }

  loadYears() {
    let currentYear = new Date().getFullYear();
    const minYear = 2023;
    while (currentYear >= minYear) {
      this.years.push({name: currentYear.toString(), code: currentYear});
      currentYear--;
    }
  }
}