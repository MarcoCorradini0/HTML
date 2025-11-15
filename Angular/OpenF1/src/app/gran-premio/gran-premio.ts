import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Openf1Service } from '../services/openf1-service';
import { Meeting } from '../models/meeting';
import { Session } from '../models/session';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Driver } from '../models/driver';

@Component({
  selector: 'app-gran-premio',
  imports: [DatePipe, TableModule, NgClass, NgStyle],
  templateUrl: './gran-premio.html',
  styleUrl: '../gran-premi/gran-premi.css'
})
export class GranPremio {

  private readonly route = inject(ActivatedRoute);
  private readonly openf1Service = inject(Openf1Service);

  meeting: Meeting | undefined;
  sessions: Session[] = [];
  driver: Driver[] = [];

  /* LOGHI TEAM UFFICIALI + COLORI TEAM */
  teamStyles: any = {
    'Red Bull Racing': { color: '#1E41FF', logo: 'https://upload.wikimedia.org/wikipedia/en/6/6b/Red_Bull_Racing_logo.svg' },
    'Ferrari': { color: '#DC0000', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Scuderia_Ferrari_Logo.svg/1200px-Scuderia_Ferrari_Logo.svg.png' },
    'Mercedes': { color: '#00A19C', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Mercedes_AMG_Petronas_F1_Logo.svg' },
    'McLaren': { color: '#FF8700', logo: 'https://upload.wikimedia.org/wikipedia/en/6/6f/McLaren_Racing_logo.svg' },
    'Williams': { color: '#00A0DE', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Williams_Grand_Prix_Engineering_logo.svg' },
    'Aston Martin': { color: '#006F62', logo: 'https://upload.wikimedia.org/wikipedia/en/6/6d/Aston_Martin_Aramco_Cognizant_Formula_One_Team_logo.svg' },
    'Alpine': { color: '#0090FF', logo: 'https://upload.wikimedia.org/wikipedia/en/1/15/Alpine_F1_Team_Logo.svg' },
    'Racing Bulls': { color: '#2B4562', logo: 'https://upload.wikimedia.org/wikipedia/en/1/1c/VCARB_F1_Team_Logo.svg' },
    'Haas F1 Team': { color: '#B6BABD', logo: 'https://upload.wikimedia.org/wikipedia/en/7/70/Haas_F1_Team_logo.svg' },
    'Kick Sauber': { color: '#52E252', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7d/Kick_Sauber_F1_Team_logo.svg' }
  };

  /* INIT */
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

  /* DRIVER BY NUMBER */
  getDriversByNumber(drivers: Driver[], driver_number: number): Driver {
    return drivers.find(driver => driver.driver_number === driver_number)!;
  }

  /* BANDIERA PILOTA */
  getDriverFlag(driver: Driver | undefined) {
    if (!driver || !driver.country_code) return null;
    return `https://flagcdn.com/24x18/${driver.country_code.toLowerCase()}.png`;
  }

  /* LOGO TEAM */
  getTeamLogo(team: string | undefined) {
    if (!team) return null;
    return this.teamStyles[team]?.logo ?? null;
  }

  /* COLORE BORDO + NOME TEAM */
  getTeamStyle(team: string | undefined) {
    if (!team) return {};
    const style = this.teamStyles[team];
    if (!style) return {};
    return {
      'border-left': `4px solid ${style.color}`,
      'color': `${style.color}`,
      'font-weight': '600'
    };
  }

  /* FORMAT GAP SENZA +s */
  formatGap(gap: any): string {
    if (!gap && gap !== 0) return '—';
    return gap.toString().replace('+', '') + 's';
  }

  /* FORMAT TEMPI QUALIFICHE */
  formatQualifyingTimes(times: string[] | undefined): string[] {
    if (!times || times.length === 0) return ['—', '—', '—'];
    return times.map(t => (t && t.trim() !== '') ? t.replace('+', '') + 's' : '—');
  }

  /* DNF / STATUS */
  getStatus(result: any): string {
    if (result.status && result.status.toUpperCase().includes('DNF')) return 'DNF';
    if (result.position !== 1 && (!result.gap_to_leader || result.gap_to_leader === "")) return 'DNF';
    if (result.total_laps && result.number_of_laps) {
      const diff = result.total_laps - result.number_of_laps;
      if (diff > 3) return 'DNF';
    }
    return result.number_of_laps;
  }

}
