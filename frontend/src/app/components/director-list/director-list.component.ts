import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DirectorService } from '../../services/director.service';
import { Director } from '../../models/director.model';

@Component({
  selector: 'app-director-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Directores</h1>
        <a 
          routerLink="/directors/new" 
          class="btn btn-primary">
          Nuevo Director
        </a>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nacionalidad</th>
              <th>Edad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let director of directors">
              <td>{{ director.name }}</td>
              <td>{{ director.nationality || 'N/A' }}</td>
              <td>{{ director.age || 'N/A' }}</td>
              <td>
                <span 
                  [class]="director.active ? 'status-active' : 'status-inactive'">
                  {{ director.active ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td>
                <a 
                  [routerLink]="['/directors', director.id, 'edit']"
                  class="btn btn-secondary mr-3">
                  Editar
                </a>
                <button 
                  (click)="deleteDirector(director.id)"
                  class="btn btn-danger">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="loading" class="text-center mb-4">
        <p>Cargando directores...</p>
      </div>

      <div *ngIf="!loading && directors.length === 0" class="text-center mb-4">
        <p>No hay directores disponibles</p>
      </div>
    </div>
  `,
  styles: []
})
export class DirectorListComponent implements OnInit {
  directors: Director[] = [];
  loading = false;

  constructor(private directorService: DirectorService) {}

  ngOnInit(): void {
    this.loadDirectors();
  }

  loadDirectors(): void {
    this.loading = true;
    this.directorService.getDirectors().subscribe({
      next: (directors) => {
        this.directors = directors;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando directores:', error);
        this.loading = false;
      }
    });
  }

  deleteDirector(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este director?')) {
      this.directorService.deleteDirector(id).subscribe({
        next: () => {
          this.directors = this.directors.filter(d => d.id !== id);
          alert('Director eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error eliminando director:', error);
          alert('Error al eliminar el director');
        }
      });
    }
  }
} 