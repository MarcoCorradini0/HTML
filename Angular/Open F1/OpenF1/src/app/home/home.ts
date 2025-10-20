import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [NgIf],
  standalone: true,
})
export class Home implements OnInit {
  videoUrl: SafeResourceUrl | null = null;
  private readonly CHANNEL_ID = 'UCd8iY-kEHtaB8qt8MH--zGw';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const uploadsPlaylist = this.CHANNEL_ID.replace(/^UC/, 'UU');
    const embed = `https://www.youtube.com/embed?listType=playlist&list=${uploadsPlaylist}`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embed);
  }
}
