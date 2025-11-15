import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { environment } from '../../environments/environment.local';

interface TeamChannel {
  name: string;
  channelId: string;
}

interface Video {
  title: string;
  videoUrl?: SafeResourceUrl;
  error?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [NgIf, NgFor],
  standalone: true,
})
export class HomeComponent implements OnInit {
  activeTeamIndex = 0;
  activeVideoIndex = 0;

  teams: TeamChannel[] = [
    { name: 'Ferrari', channelId: 'UCd8iY-kEHtaB8qt8MH--zGw' },
    { name: 'Marco Corradini', channelId: 'UCvYUADghIQFP1wNj0IzJufA' },
    { name: 'Mercedes-AMG F1', channelId: 'UCHmqpYhza6fKtzYYyYgJTGw' },
    { name: 'McLaren', channelId: 'UC8NsMBYKqHFz8JvHNhD3k0g' },
    { name: 'Aston Martin', channelId: 'UC6lcs8IwqMZrkB_5dzXXBQw' },
    { name: 'Alpine F1 Team', channelId: 'UCPwy2q7BNjdLQFLNzeCWqmQ' },
    { name: 'Williams Racing', channelId: 'UCxJ_nd6Mn6eXIO3ZrUARVSw' },
    { name: 'Red Bull Racing', channelId: 'UCwFUo5jJhN_qA49DB00bADQ' },
    { name: 'Haas F1 Team', channelId: 'UC6Cn5_OKxqPt_CZHNJOxBAA' },
    { name: 'Alfa Romeo F1 Team', channelId: 'UCj2p1RSH8xK_9f8ZsQS3eAg' }
  ];

  videos: Video[] = [];
  loading = false;
  private API_KEY = environment.YOUTUBE_API_KEY;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadVideos(this.teams[this.activeTeamIndex].channelId);
  }

  loadVideos(channelId: string) {
    this.loading = true;
    this.videos = [];

    const url = `https://www.googleapis.com/youtube/v3/search?key=${this.API_KEY}` +
      `&channelId=${channelId}` +
      `&part=snippet,id` +
      `&order=date` +
      `&maxResults=10&type=video`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        if (!res.items || res.items.length === 0) {
          this.videos = [{ title: 'Errore: nessun video trovato', error: 'Nessun video disponibile' }];
        } else {
          this.videos = res.items.map((item: any) => {
            const videoId = item.id.videoId;
            return {
              title: item.snippet.title,
              videoUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
                `https://www.youtube.com/embed/${videoId}`
              )
            };
          });
        }
        this.activeVideoIndex = 0;
        this.loading = false;
      },
      error: (err) => {
        this.videos = [{ title: 'Errore durante il caricamento', error: err.message }];
        this.loading = false;
      }
    });
  }

  nextTeam(): void {
    this.activeTeamIndex = (this.activeTeamIndex + 1) % this.teams.length;
    this.loadVideos(this.teams[this.activeTeamIndex].channelId);
  }

  previousTeam(): void {
    this.activeTeamIndex =
      (this.activeTeamIndex - 1 + this.teams.length) % this.teams.length;
    this.loadVideos(this.teams[this.activeTeamIndex].channelId);
  }

  nextVideo(): void {
    if (this.videos.length === 0) return;
    this.activeVideoIndex = (this.activeVideoIndex + 1) % this.videos.length;
  }

  previousVideo(): void {
    if (this.videos.length === 0) return;
    this.activeVideoIndex =
      (this.activeVideoIndex - 1 + this.videos.length) % this.videos.length;
  }
}
