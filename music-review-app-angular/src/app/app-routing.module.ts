import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlbumPageComponent } from './pages/album-page/album-page.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AlbumComponent } from './pages/albums/albums.component';
import { appRoutes } from './app.routes'; 



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'albums/:id', component: AlbumComponent },  
  { path: '', component: HomeComponent },
  { path: 'albums/:id', component: AlbumPageComponent },
  { path: 'users/:id', component: UserProfileComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }