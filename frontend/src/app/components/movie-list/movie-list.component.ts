import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Películas</h1>
        <a 
          routerLink="/movies/new" 
          class="btn btn-primary">
          Nueva Película
        </a>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Año</th>
              <th>Género</th>
              <th>Duración</th>
              <th>Director</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let movie of movies">
              <td>{{ movie.name }}</td>
              <td>{{ movie.releaseYear ? (movie.releaseYear | date:'yyyy') : 'N/A' }}</td>
              <td>{{ movie.gender || 'N/A' }}</td>
              <td>{{ movie.duration || 'N/A' }}</td>
              <td>{{ movie.director?.name || 'N/A' }}</td>
              <td>
                <a 
                  [routerLink]="['/movies', movie.id, 'edit']"
                  class="btn btn-secondary mr-3">
                  Editar
                </a>
                <button 
                  (click)="deleteMovie(movie.id)"
                  class="btn btn-danger">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="loading" class="text-center mb-4">
        <p>Cargando películas...</p>
      </div>

      <div *ngIf="!loading && movies.length === 0" class="text-center mb-4">
        <p>No hay películas disponibles</p>
      </div>
    </div>
  `,
  styles: []
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  loading = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading = true;
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando películas:', error);
        this.loading = false;
      }
    });
  }

  deleteMovie(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
      this.movieService.deleteMovie(id).subscribe({
        next: () => {
          this.movies = this.movies.filter(m => m.id !== id);
          alert('Película eliminada exitosamente');
        },
        error: (error) => {
          console.error('Error eliminando película:', error);
          alert('Error al eliminar la película');
        }
      });
    }
  }
} 