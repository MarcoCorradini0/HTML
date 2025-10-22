import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Meeting } from '../models/meeting';
import { firstValueFrom } from 'rxjs';

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
}
