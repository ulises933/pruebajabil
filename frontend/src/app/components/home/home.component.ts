import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="home-container">
        <h1 class="home-title">🎬 Sistema de Gestión de Cine</h1>
        <p class="home-subtitle">Gestiona directores y películas de manera fácil y eficiente</p>
        
        <div class="features-grid">
          <div class="feature-card">
            <h2 class="feature-title">👨‍🎬 Directores</h2>
            <p class="feature-description">Administra la información de los directores de cine</p>
            <ul class="feature-list">
              <li>• Ver todos los directores</li>
              <li>• Crear nuevos directores</li>
              <li>• Editar información existente</li>
              <li>• Eliminar directores</li>
            </ul>
            <a 
              routerLink="/directors"
              class="btn btn-primary">
              Gestionar Directores
            </a>
          </div>
          
          <div class="feature-card">
            <h2 class="feature-title">🎭 Películas</h2>
            <p class="feature-description">Gestiona el catálogo de películas</p>
            <ul class="feature-list">
              <li>• Ver todas las películas</li>
              <li>• Crear nuevas películas</li>
              <li>• Editar información existente</li>
              <li>• Eliminar películas</li>
            </ul>
            <a 
              routerLink="/movies"
              class="btn btn-success">
              Gestionar Películas
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent {} 