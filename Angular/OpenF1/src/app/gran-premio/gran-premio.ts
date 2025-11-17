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

  dispenserTeam: any = {
    'Red Bull Racing': { color: '#1E41FF', logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/redbullracing/2025redbullracinglogowhite.webp', car: 'https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/d_common:f1:2025:fallback:car:2025fallbackcarright.webp/v1740000000/common/f1/2025/redbullracing/2025redbullracingcarright.webp' },
    'Ferrari': { color: '#DC0000', logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/ferrari/2025ferrarilogolight.webp', car: 'https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/d_common:f1:2025:fallback:car:2025fallbackcarright.webp/v1740000000/common/f1/2025/ferrari/2025ferraricarright.webp' },
    'Mercedes': { color: '#00A19C', logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/mercedes/2025mercedeslogowhite.webp', car: 'https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/d_common:f1:2025:fallback:car:2025fallbackcarright.webp/v1740000000/common/f1/2025/mercedes/2025mercedescarright.webp' },
    'McLaren': { color: '#FF8700', logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/mclaren/2025mclarenlogowhite.webp', car: 'https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/d_common:f1:2025:fallback:car:2025fallbackcarright.webp/v1740000000/common/f1/2025/mclaren/2025mclarencarright.webp' },
    'Williams': { color: '#00A0DE', logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/williams/2025williamslogowhite.webp', car: 'https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/d_common:f1:2025:fallback:car:2025fallbackcarright.webp/v1740000000/common/f1/2025/williams/2025williamscarright.webp' },
    'Aston Martin': { color: '#006F62', logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/astonmartin/2025astonmartinlogowhite.webp', car: 'https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/d_common:f1:2025:fallback:car:2025fallbackcarright.webp/v1740000000/common/f1/2025/astonmartin/2025astonmartincarright.webp' },
    'Alpine': { color: '#0090FF', logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/alpine/2025alpinelogowhite.webp', car: 'https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/d_common:f1:2025:fallback:car:2025fallbackcarright.webp/v1740000000/common/f1/2025/alpine/2025alpinecarright.webp' },
    'Racing Bulls': { color: '#2B4562', logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/racingbulls/2025racingbullslogowhite.webp', car: 'https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/d_common:f1:2025:fallback:car:2025fallbackcarright.webp/v1740000000/common/f1/2025/racingbulls/2025racingbullscarright.webp' },
    'Haas F1 Team': { color: '#B6BABD', logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/haas/2025haaslogowhite.webp', car: 'https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/d_common:f1:2025:fallback:car:2025fallbackcarright.webp/v1740000000/common/f1/2025/haasf1team/2025haasf1teamcarright.webp' },
    'Kick Sauber': { color: '#52E252', logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/kicksauber/2025kicksauberlogowhite.webp', car: 'https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/d_common:f1:2025:fallback:car:2025fallbackcarright.webp/v1740000000/common/f1/2025/kicksauber/2025kicksaubercarright.webp' },
  };

  dispenserPilot: Record<string, { flag: string, pilot: string }> = {
    'Oscar Piastri': { flag: '/flags/au.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/mclaren/oscpia01/2025mclarenoscpia01right.webp' },
    'Lando Norris': { flag: '/flags/gb.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/mclaren/lannor01/2025mclarenlannor01right.webp' },
    'George Russell': { flag: '/flags/gb.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/mercedes/georus01/2025mercedesgeorus01right.webp' },
    'Kimi Antonelli': { flag: '/flags/it.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/mercedes/andant01/2025mercedesandant01right.webp' },
    'Max Verstappen': { flag: '/flags/nl.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/redbullracing/maxver01/2025redbullracingmaxver01right.webp' },
    'Yuki Tsunoda': { flag: '/flags/jp.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/redbullracing/yuktsu01/2025redbullracingyuktsu01right.webp' },
    'Charles Leclerc': { flag: '/flags/mt.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/ferrari/chalec01/2025ferrarichalec01right.webp' },
    'Lewis Hamilton': { flag: '/flags/gb.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/ferrari/lewham01/2025ferrarilewham01right.webp' },
    'Alexander Albon': { flag: '/flags/th.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/williams/alealb01/2025williamsalealb01right.webp' },
    'Carlos Sainz': { flag: '/flags/es.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/williams/carsai01/2025williamscarsai01right.webp' },
    'Liam Lawson': { flag: '/flags/nl.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/racingbulls/lialaw01/2025racingbullslialaw01right.webp' },
    'Isack Hadjar': { flag: '/flags/fr.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/racingbulls/isahad01/2025racingbullsisahad01right.webp' },
    'Lance Stroll': { flag: '/flags/ca.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/astonmartin/lanstr01/2025astonmartinlanstr01right.webp' },
    'Fernando Alonso': { flag: '/flags/es.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/astonmartin/feralo01/2025astonmartinferalo01right.webp' },
    'Esteban Ocon': { flag: '/flags/fr.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/haasf1team/estoco01/2025haasf1teamestoco01right.webp' },
    'Oliver Bearman': { flag: '/flags/gb.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/haasf1team/olibea01/2025haasf1teamolibea01right.webp' },
    'Nico Hülkenberg': { flag: '/flags/de.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/kicksauber/nichul01/2025kicksaubernichul01right.webp' },
    'Gabriel Bortoleto': { flag: '/flags/br.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/kicksauber/gabbor01/2025kicksaubergabbor01right.webp' },
    'Pierre Gasly': { flag: '/flags/fr.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/alpine/piegas01/2025alpinepiegas01right.webp' },
    'Franco Colapinto': { flag: '/flags/br.png', pilot: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2025:fallback:driver:2025fallbackdriverright.webp/v1740000000/common/f1/2025/alpine/fracol01/2025alpinefracol01right.webp' }
  };

  dispenserSponsors: any = {
    'Aramco': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-aramco.webp' },
    'AWS': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-aws.webp' },
    'Crypto': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-crypto.webp' },
    'DHL': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-DHL.webp' },
    'Heineken': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-Heineken.webp' },
    'Lenovo': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-Lenovo.webp' },
    'LVMH': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-LVMH.webp' },
    'MSC': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-MSC.webp' },
    'Pirelli': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-Pirelli.webp' },
    'Qatar Airways': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-Qatar%20Airways.webp' },
    'Salesforce': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-salesforce.webp' },
    'Allwyn': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-allwyn.webp' },
    'American Express': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-American%20Express.webp' },
    'Barilla': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-Barilla.webp' },
    'Globant': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-Globant.webp' },
    'Las Vegas': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-Las%20Vegas.webp' },
    'Liqui Moly': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-Liqui%20Moly.webp' },
    'Louis Vuitton': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-Louis%20Vuitton.webp' },
    'Moet': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-Moet.webp' },
    'Nestle': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-Nestle.webp' },
    'Paramount': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-Paramount.webp' },
    'PepsiCo': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-PepsiCo.webp' },
    'PwC': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-pwc.webp' },
    'Santander': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-Santander.webp' },
    'TAG': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-TAG.webp' },
    'McDonald\'s': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-McDonalds.webp' },
    'Aggreko': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-aggreko.webp' },
    'BBS': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-BBS.webp' },
    'Puma': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-Puma.webp' },
    'TATA': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-TATA.webp' },
    'Fanatec': { sponsor: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/manual/Misc/PartnersPage/2025%20RD/700x300-Fanatec.webp' }
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
    return this.dispenserTeam[teamName]?.logo ?? null;
  }

  // Per ottenere la car del pilota
  getTeamCar(driverName: string | undefined) {
    if (!driverName) return null;
    return this.dispenserTeam[driverName]?.car ?? null;
  }

  // Per parsare il nome
  normalize(name: string) {
    return name
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "");
  }

  getPilotField(
    driverName: string | undefined,
    field: 'pilot' | 'flag'
  ) {
    if (!driverName) return null;
    const normalized = this.normalize(driverName);
    const entry = Object.entries(this.dispenserPilot)
      .find(([name]) => this.normalize(name) === normalized);
    return entry ? entry[1][field] : null;
  }

  getPilotImage(name: string | undefined) {
    return this.getPilotField(name, 'pilot');
  }

  getPilotFlag(name: string | undefined) {
    return this.getPilotField(name, 'flag');
  }

  /* COLORE BORDO + NOME TEAM */
  getStyle(name: string | undefined, isDriver: boolean = false) {
    if (!name) return {};
    if (isDriver) {
      const style = this.dispenserTeam[name];
      if (style) {
        return {
          'display': 'inline',
          'justify-content': 'center',
          'align-items': 'center',
          'border-radius': '100%',
          'width': '40px',
          'height': '40px',
          'background-color': style.color,
          'color': style.color,
          'font-weight': '600'
        };
      }
    }
    const style = this.dispenserTeam[name];
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
