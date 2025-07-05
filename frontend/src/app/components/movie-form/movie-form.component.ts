import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { DirectorService } from '../../services/director.service';
import { Movie, CreateMovie, UpdateMovie } from '../../models/movie.model';
import { Director } from '../../models/director.model';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <div class="form-container">
        <div class="page-header">
          <a 
            routerLink="/movies" 
            class="btn btn-secondary">
            ← Volver
          </a>
          <h1 class="page-title">
            {{ isEditing ? 'Editar Película' : 'Nueva Película' }}
          </h1>
        </div>

        <form (ngSubmit)="onSubmit()" #movieForm="ngForm" class="form-card">
          <div class="form-group">
            <label for="name" class="form-label">
              Título *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              [(ngModel)]="movie.name"
              required
              class="form-input"
              placeholder="Título de la película">
          </div>

          <div class="form-group">
            <label for="releaseYear" class="form-label">
              Año de Lanzamiento
            </label>
            <input
              type="date"
              id="releaseYear"
              name="releaseYear"
              [(ngModel)]="movie.releaseYear"
              class="form-input">
          </div>

          <div class="form-group">
            <label for="gender" class="form-label">
              Género
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              [(ngModel)]="movie.gender"
              class="form-input"
              placeholder="Género">
          </div>

          <div class="form-group">
            <label for="duration" class="form-label">
              Duración (HH:MM:SS)
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              [(ngModel)]="movie.duration"
              class="form-input"
              placeholder="02:30:00"
              pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$">
            <small style="color: #6b7280; font-size: 0.875rem;">
              Formato: HH:MM:SS (ejemplo: 02:30:00 para 2 horas 30 minutos)
            </small>
          </div>

          <div class="form-group">
            <label for="fkDirector" class="form-label">
              Director
            </label>
            <select
              id="fkDirector"
              name="fkDirector"
              [(ngModel)]="movie.fkDirector"
              class="form-select">
              <option value="">Seleccionar director</option>
              <option *ngFor="let director of directors" [value]="director.id">
                {{ director.name }}
              </option>
            </select>
          </div>

          <div class="form-actions">
            <a
              routerLink="/movies"
              class="btn btn-secondary">
              Cancelar
            </a>
            <button
              type="submit"
              [disabled]="!movieForm.valid || loading"
              class="btn btn-primary">
              {{ loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class MovieFormComponent implements OnInit {
  movie: CreateMovie = {
    name: '',
    releaseYear: '',
    gender: '',
    duration: '',
    fkDirector: undefined
  };
  
  directors: Director[] = [];
  isEditing = false;
  loading = false;
  movieId?: number;

  constructor(
    private movieService: MovieService,
    private directorService: DirectorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadDirectors();
    
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditing = true;
        this.movieId = +id;
        this.loadMovie(this.movieId);
      }
    });
  }

  loadDirectors(): void {
    this.directorService.getDirectors().subscribe({
      next: (directors) => {
        this.directors = directors.filter(d => d.active);
      },
      error: (error) => {
        console.error('Error cargando directores:', error);
      }
    });
  }

  loadMovie(id: number): void {
    this.movieService.getMovie(id).subscribe({
      next: (movie) => {
        this.movie = {
          name: movie.name,
          releaseYear: movie.releaseYear || '',
          gender: movie.gender || '',
          duration: movie.duration || '',
          fkDirector: movie.fkDirector
        };
      },
      error: (error) => {
        console.error('Error cargando película:', error);
        alert('Error al cargar la película');
        this.router.navigate(['/movies']);
      }
    });
  }

  onSubmit(): void {
    if (!this.movie.name.trim()) {
      alert('El título es obligatorio');
      return;
    }

    if (this.movie.duration && !this.movie.duration.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)) {
      alert('El formato de duración debe ser HH:MM:SS (ejemplo: 02:30:00)');
      return;
    }

    this.loading = true;

    if (this.isEditing && this.movieId) {
      const updateData: UpdateMovie = {
        name: this.movie.name,
        releaseYear: this.movie.releaseYear,
        gender: this.movie.gender,
        duration: this.movie.duration,
        fkDirector: this.movie.fkDirector
      };

      this.movieService.updateMovie(this.movieId, updateData).subscribe({
        next: () => {
          alert('Película actualizada exitosamente');
          this.router.navigate(['/movies']);
        },
        error: (error) => {
          console.error('Error actualizando película:', error);
          alert('Error al actualizar la película');
          this.loading = false;
        }
      });
    } else {
      this.movieService.createMovie(this.movie).subscribe({
        next: () => {
          alert('Película creada exitosamente');
          this.router.navigate(['/movies']);
        },
        error: (error) => {
          console.error('Error creando película:', error);
          alert('Error al crear la película');
          this.loading = false;
        }
      });
    }
  }
} 