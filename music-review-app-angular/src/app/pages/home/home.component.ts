// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlbumService } from '../../services/album.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class HomeComponent {
  albums: any[] = [];
  albumInput: string = '';
  importMessage: string = '';

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.fetchAlbums();
  }

  fetchAlbums(): void {
    this.albumService.getAlbums().subscribe({
      next: (data) => {
        this.albums = data;
      },
      error: (err) => {
        console.error('Failed to fetch albums:', err);
      }
    });
  }

  importAlbum(): void {
    if (!this.albumInput.trim()) return;

    this.albumService.importAlbum(this.albumInput).subscribe({
      next: (response) => {
        this.importMessage = 'Album imported successfully!';
        this.albumInput = '';
        this.fetchAlbums(); // refresh list
      },
      error: (err) => {
        console.error('Import failed:', err);
        this.importMessage = 'Failed to import album.';
      }
    });
  }
}