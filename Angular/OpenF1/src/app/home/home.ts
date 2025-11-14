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
  videoUrl: SafeResourceUrl;
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
    { name: 'Mercedes-AMG F1', channelId: 'UCHmqpYhza6fKtzYYyYgJTGw' }
  ];

  videos: Video[] = [];
  private API_KEY = environment.YOUTUBE_API_KEY;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadVideos(this.teams[this.activeTeamIndex].channelId);
  }

  loadVideos(channelId: string) {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${this.API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`;
    this.http.get<any>(url).subscribe((res) => {
      this.videos = res.items
        .filter((item: any) => item.id.videoId)
        .map((item: any) => ({
          title: item.snippet.title,
          videoUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${item.id.videoId}`
          ),
        }));
      this.activeVideoIndex = 0;
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
