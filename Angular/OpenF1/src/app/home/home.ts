import { NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface TeamChannel {
  name: string;
  channelId: string;
  playlistUrl?: SafeResourceUrl;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [NgIf, NgFor],
  standalone: true,
})
export class Home implements OnInit {
  activeIndex = 0;

  teams: TeamChannel[] = [
    { name: 'Ferrari', channelId: 'UCd8iY-kEHtaB8qt8MH--zGw' },            // @Ferrari
    { name: 'Red Bull Racing', channelId: 'UCXbQnPeM4qn4IIEwR0yvXEg' },    // @redbullracing
    { name: 'Mercedes-AMG F1', channelId: 'UCHmqpYhza6fKtzYYyYgJTGw' },    // @MercedesAMGF1
    { name: 'McLaren', channelId: 'UC8NsMBYKqHFz8JvHNhD3k0g' },            // @McLaren
    { name: 'Aston Martin', channelId: 'UC6lcs8IwqMZrkB_5dzXXBQw' },       // @astonmartinf1team
    { name: 'Alpine F1 Team', channelId: 'UCPwy2q7BNjdLQFLNzeCWqmQ' },     // @alpinef1team74
    { name: 'Williams Racing', channelId: 'UCxJ_nd6Mn6eXIO3ZrUARVSw' },    // @WilliamsF1TV
    { name: 'Visa Cash App RB', channelId: 'UCwFUo5jJhN_qA49DB00bADQ' },   // @VisaCashAppRB
    { name: 'Haas F1 Team', channelId: 'UC6Cn5_OKxqPt_CZHNJOxBAA' }        // @Haasf1team
  ];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.teams = this.teams.map(team => ({
      ...team,
      playlistUrl: this.getPlaylistUrl(team.channelId)
    }));
  }

  private getPlaylistUrl(channelId: string): SafeResourceUrl {
    const uploadsPlaylist = channelId.replace(/^UC/, 'UU');
    const embed = `https://www.youtube.com/embed?listType=playlist&list=${uploadsPlaylist}&rel=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embed);
  }

  nextVideo(): void {
    this.activeIndex = (this.activeIndex + 1) % this.teams.length;
  }

  previousVideo(): void {
    this.activeIndex = (this.activeIndex - 1 + this.teams.length) % this.teams.length;
  }
}
