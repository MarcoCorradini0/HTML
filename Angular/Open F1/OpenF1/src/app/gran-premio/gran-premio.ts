import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Openf1Service } from '../services/openf1-service';
import { Meeting } from '../models/meeting';
import { Session } from '../models/session';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Driver } from '../models/driver';
@Component({
  selector: 'app-gran-premio',
  imports: [DatePipe, TableModule],
  templateUrl: './gran-premio.html',
  styleUrl: '../gran-premi/gran-premi.css'
})
export class GranPremio {
  private readonly route = inject(ActivatedRoute);
  private readonly openf1Service = inject(Openf1Service);
  meeting: Meeting | undefined;
  sessions: Session[] = [];
  driver: Driver[] = [];

  async ngOnInit() {
    const meetingId = this.route.snapshot.paramMap.get('id');

    this.meeting = await this.openf1Service.getMeeting(Number(meetingId));
    this.sessions = await this.openf1Service.getSessions(Number(meetingId));

    setTimeout(() => {
      this.sessions.forEach(async element => {
        const results = await this.openf1Service.getSessionsResults(element.session_key);
        const drivers = await this.openf1Service.getDriversByNumber(element.session_key);
        element.results = results;
        element.drivers = drivers;
      });
    }, 2000);
  }

  getDriversByNumber(drivers: Driver[], driver_number: number): Driver {
    console.log(drivers);
    console.log(driver_number);
    return drivers.find(driver => driver.driver_number === driver_number)!;
  }
}