import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { ReviewService } from '../../services/review.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-album',
  standalone: true,
  imports: [FormsModule, CommonModule], // ✅ required for ngModel
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
})
export class AlbumComponent implements OnInit {
  album: any;
  reviews: any[] = [];
  newReview = {
    rating: '' as number | '',
    comment: '',
  };
  importMessage = '';

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const albumId = this.route.snapshot.paramMap.get('id');
    if (albumId) {
      this.albumService.getAlbumById(albumId).subscribe((data) => {
        this.album = data;
        console.log('Album:', this.album);
      });

      this.reviewService.getReviewsByAlbum(albumId).subscribe((data) => {
        this.reviews = data;
      });
    }
  }

  submitReview(): void {
    const albumId = this.route.snapshot.paramMap.get('id');
    const userId = '687d7b4c652ec6d41b3aa751'; // Replace with actual user later

    if (!this.newReview.rating || !this.newReview.comment) {
      this.importMessage = 'Rating and comment are required.';
      return;
    }

    const reviewData = {
      ...this.newReview,
      rating: Number(this.newReview.rating), 
      albumId: albumId || '',
      userId,
    };

    this.reviewService.createReview(reviewData).subscribe({
      next: (review) => {
        console.log('Review created:', review); // ✅
        this.reviews.push(review);
        this.newReview = { rating: 0, comment: '' };
        this.importMessage = 'Review submitted successfully!';
      },
      error: () => {
        this.importMessage = 'Failed to submit review.';
      },
    });
  }
}