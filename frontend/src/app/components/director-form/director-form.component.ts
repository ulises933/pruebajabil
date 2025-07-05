import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { DirectorService } from '../../services/director.service';
import { Director, CreateDirector, UpdateDirector } from '../../models/director.model';

@Component({
  selector: 'app-director-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <div class="form-container">
        <div class="page-header">
          <a 
            routerLink="/directors" 
            class="btn btn-secondary">
            ← Volver
          </a>
          <h1 class="page-title">
            {{ isEditing ? 'Editar Director' : 'Nuevo Director' }}
          </h1>
        </div>

        <form (ngSubmit)="onSubmit()" #directorForm="ngForm" class="form-card">
          <div class="form-group">
            <label for="name" class="form-label">
              Nombre *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              [(ngModel)]="director.name"
              required
              class="form-input"
              placeholder="Nombre del director">
          </div>

          <div class="form-group">
            <label for="nationality" class="form-label">
              Nacionalidad
            </label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              [(ngModel)]="director.nationality"
              class="form-input"
              placeholder="Nacionalidad">
          </div>

          <div class="form-group">
            <label for="age" class="form-label">
              Edad
            </label>
            <input
              type="number"
              id="age"
              name="age"
              [(ngModel)]="director.age"
              class="form-input"
              placeholder="Edad">
          </div>

          <div class="form-group">
            <label class="form-label">
              <input
                type="checkbox"
                name="active"
                [(ngModel)]="director.active"
                class="form-checkbox">
              Activo
            </label>
          </div>

          <div class="form-actions">
            <a
              routerLink="/directors"
              class="btn btn-secondary">
              Cancelar
            </a>
            <button
              type="submit"
              [disabled]="!directorForm.valid || loading"
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
export class DirectorFormComponent implements OnInit {
  director: CreateDirector = {
    name: '',
    nationality: '',
    age: undefined,
    active: true
  };
  
  isEditing = false;
  loading = false;
  directorId?: number;

  constructor(
    private directorService: DirectorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditing = true;
        this.directorId = +id;
        this.loadDirector(this.directorId);
      }
    });
  }

  loadDirector(id: number): void {
    this.directorService.getDirector(id).subscribe({
      next: (director) => {
        this.director = {
          name: director.name,
          nationality: director.nationality || '',
          age: director.age,
          active: director.active
        };
      },
      error: (error) => {
        console.error('Error cargando director:', error);
        alert('Error al cargar el director');
        this.router.navigate(['/directors']);
      }
    });
  }

  onSubmit(): void {
    if (!this.director.name.trim()) {
      alert('El nombre es obligatorio');
      return;
    }

    this.loading = true;

    if (this.isEditing && this.directorId) {
      const updateData: UpdateDirector = {
        name: this.director.name,
        nationality: this.director.nationality,
        age: this.director.age,
        active: this.director.active
      };

      this.directorService.updateDirector(this.directorId, updateData).subscribe({
        next: () => {
          alert('Director actualizado exitosamente');
          this.router.navigate(['/directors']);
        },
        error: (error) => {
          console.error('Error actualizando director:', error);
          alert('Error al actualizar el director');
          this.loading = false;
        }
      });
    } else {
      this.directorService.createDirector(this.director).subscribe({
        next: () => {
          alert('Director creado exitosamente');
          this.router.navigate(['/directors']);
        },
        error: (error) => {
          console.error('Error creando director:', error);
          alert('Error al crear el director');
          this.loading = false;
        }
      });
    }
  }
} 