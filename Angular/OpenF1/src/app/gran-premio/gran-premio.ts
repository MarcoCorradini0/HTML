import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Openf1Service } from '../services/openf1-service';
import { Meeting } from '../models/meeting';
import { Session } from '../models/session';
import { Driver } from '../models/driver';
import { CommonModule, DatePipe, NgClass, NgStyle } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-gran-premio',
  imports: [DatePipe, TableModule, NgClass, NgStyle, CommonModule, FormsModule],
  templateUrl: './gran-premio.html',
  styleUrls: ['../gran-premi/gran-premi.css']
})
export class GranPremio {

  private readonly route = inject(ActivatedRoute);
  private readonly openf1Service = inject(Openf1Service);

  meeting: Meeting | undefined;
  sessions: Session[] = [];
  driver: Driver[] = [];

  dispenseR: any = {
    'Red Bull Racing': { color: '#1E41FF',
      logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/redbullracing/2025redbullracinglogowhite.webp'
    },
    'Ferrari': { color: '#DC0000',
      logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/ferrari/2025ferrarilogolight.webp'
    },
    'Mercedes': { color: '#00A19C',
      logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/mercedes/2025mercedeslogowhite.webp'
    },
    'McLaren': { color: '#FF8700',
      logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/mclaren/2025mclarenlogowhite.webp'
    },
    'Williams': { color: '#00A0DE',
      logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/williams/2025williamslogowhite.webp'
    },
    'Aston Martin': { color: '#006F62',
      logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/astonmartin/2025astonmartinlogowhite.webp'
    },
    'Alpine': { color: '#0090FF',
      logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/alpine/2025alpinelogowhite.webp'
    },
    'Racing Bulls': { color: '#2B4562',
      logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/racingbulls/2025racingbullslogowhite.webp'
    },
    'Haas F1 Team': { color: '#B6BABD',
      logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/haas/2025haaslogowhite.webp'
    },
    'Kick Sauber': { color: '#52E252',
      logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/kicksauber/2025kicksauberlogowhite.webp'
    },
    'Oscar Piastri': { flag: 'https://flagpedia.net/data/flags/h80/au.png' },
    'Lando Norris': { flag: 'https://flagpedia.net/data/flags/h80/gb.png' },
    'George Russell': { flag: 'https://flagpedia.net/data/flags/h80/gb.png' },
    'Kimi Antonelli': { flag: 'https://flagpedia.net/data/flags/h80/it.png' },
    'Max Verstappen': { flag: 'https://flagpedia.net/data/flags/h80/nl.png' },
    'Yuki Tsunoda': { flag: 'https://flagpedia.net/data/flags/h80/jp.png' },
    'Charles Leclerc': { flag: 'https://flagpedia.net/data/flags/h80/mt.png' },
    'Lewis Hamilton': { flag: 'https://flagpedia.net/data/flags/h80/gb.png' },
    'Alexander Albon': { flag: 'https://flagpedia.net/data/flags/h80/th.png' },
    'Carlos Sainz': { flag: 'https://flagpedia.net/data/flags/h80/es.png' },
    'Liam Lawson': { flag: 'https://flagpedia.net/data/flags/h80/nz.png' },
    'Isack Hadjar': { flag: 'https://flagpedia.net/data/flags/h80/fr.png' },
    'Lance Stroll': { flag: 'https://flagpedia.net/data/flags/h80/ca.png' },
    'Fernando Alonso': { flag: 'https://flagpedia.net/data/flags/h80/es.png' },
    'Esteban Ocon': { flag: 'https://flagpedia.net/data/flags/h80/fr.png' },
    'Oliver Bearman': { flag: 'https://flagpedia.net/data/flags/h80/gb.png' },
    'Nico Hülkenberg': { flag: 'https://flagpedia.net/data/flags/h80/de.png' },
    'Gabriel Bortoleto': { flag: 'https://flagpedia.net/data/flags/h80/br.png' },
    'Pierre Gasly': { flag: 'https://flagpedia.net/data/flags/h80/fr.png' },
    'Franco Colapinto': { flag: 'https://flagpedia.net/data/flags/h80/ar.png' }
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
  getDriversByNumber(drivers: Driver[], driver_number: number): Driver | undefined {
    return drivers.find(driver => driver.driver_number === driver_number);
  }

  // Per ottenere il logo del team
  getTeamLogo(teamName: string | undefined) {
    if (!teamName) return null;
    return this.dispenseR[teamName]?.logo ?? null;
  }

  // Per ottenere la bandiera del pilota
  getDriverFlag(driverName: string | undefined) {
    if (!driverName) return null;
    return this.dispenseR[driverName]?.flag ?? null;
  }

  /* COLORE BORDO + NOME TEAM */
  getDispenseR(name: string | undefined, isDriver: boolean = false) {
    if (!name) return {};
    if (isDriver) {
      const style = this.dispenseR[name];
      if (style) {
        return {
          'border-left': `4px solid ${style.color}`,
          'color': style.color,
          'font-weight': '600'
        };
      }
    }
    const style = this.dispenseR[name];
    if (style) {
      return {
        'color': style.color,
        'font-weight': '600'
      };
    }
    return {};
  }

  /* FORMAT GAP SENZA +s */
  formatGap(gap: any): string {
    if (!gap && gap !== 0) return '—';
    return gap.toString().replace('+', '') + 's';
  }

  /* DNF / STATUS */
  getStatus(result: any): string {
    if (result.status && result.status.toUpperCase().includes('DNF')) return 'DNF';
    if (result.position !== 1 && (!result.gap_to_leader || result.gap_to_leader === "")) return 'DNF';
    if (result.total_laps && result.number_of_laps) {
      const diff = result.total_laps - result.number_of_laps;
      if (diff > 3) return 'DNF';
    }
    return result.number_of_laps || '—';
  }
}
