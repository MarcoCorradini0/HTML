import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Meeting } from '../models/meeting';
import { firstValueFrom } from 'rxjs';
import { Session } from '../models/session';
import { SessionResult } from '../models/session-result';
import { Driver } from '../models/driver';

@Injectable({
  providedIn: 'root'
})
export class Openf1Service {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.openf1.org/v1';

  async getMeetings(year: number): Promise<Meeting[]> {
    const response$ = this.http.get<Meeting[]>(`${this.baseUrl}/meetings?year=${year}`);
    return firstValueFrom(response$);
  }

  async getMeeting(meetingKey: number): Promise<Meeting> {
  const response$ = this.http.get<Meeting[]>(`${this.baseUrl}/meetings?meeting_key=${meetingKey}`);
  const meeting$ = await firstValueFrom(response$);
  return meeting$[0];
  }

  async getSessions(meetingKey: number): Promise<Session[]> {
  const response$ = this.http.get<Session[]>(`${this.baseUrl}/sessions?meeting_key=${meetingKey}`);
  return firstValueFrom(response$);
  }

  async getSessionsResults(sessionKey: number): Promise<SessionResult[]> {
  const response$ = this.http.get<SessionResult[]>(`${this.baseUrl}/session_result?session_key=${sessionKey}`);
  return firstValueFrom(response$);
  }

  async getDriversByNumber(sessionKey: number): Promise<Driver[]> {
  const response$ = this.http.get<Driver[]>(`${this.baseUrl}/drivers?session_key=${sessionKey}`);
  return firstValueFrom(response$);
  }
}