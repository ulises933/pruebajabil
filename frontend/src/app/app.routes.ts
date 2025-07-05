import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DirectorListComponent } from './components/director-list/director-list.component';
import { DirectorFormComponent } from './components/director-form/director-form.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'directors', component: DirectorListComponent },
  { path: 'directors/new', component: DirectorFormComponent },
  { path: 'directors/:id/edit', component: DirectorFormComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/new', component: MovieFormComponent },
  { path: 'movies/:id/edit', component: MovieFormComponent },
  { path: '**', redirectTo: '' }
];
