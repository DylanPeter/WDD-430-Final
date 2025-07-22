import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ReviewService } from '../../services/review.service';
import { CommonModule, NgIf, NgFor, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, NgIf, NgFor],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    _id: 'pete1048310@byui.edu',  // <-- used as ID
    name: 'Dylan Petersen',
    email: 'dylan@example.com'
  };

  reviews: any[] = [];
  isEditing = false;

  constructor(
    private userService: UserService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      console.log('Loaded user:', this.user); // debug
      this.loadReviews();
    });
  }

  loadReviews() {
    if (!this.user?._id) return;
    this.reviewService.getReviewsByUser(this.user._id).subscribe(reviews => {
      console.log('Loaded reviews:', reviews); // debug
      this.reviews = reviews;
    });
  }

  saveProfile() {
    console.log('Saved user:', this.user);
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
    this.loadUser();
  }
}