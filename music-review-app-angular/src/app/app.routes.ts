import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlbumComponent } from './pages/albums/albums.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'album/:id', component: AlbumComponent },
  { path: 'profile', component: ProfileComponent }
];