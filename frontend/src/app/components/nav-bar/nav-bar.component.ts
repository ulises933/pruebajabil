import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="nav">
      <div class="nav-container">
        <div class="nav-title">🎬 Sistema de Cine</div>
        <div class="nav-links">
          <a 
            routerLink="/directors" 
            routerLinkActive="active">
            Directores
          </a>
          <a 
            routerLink="/movies" 
            routerLinkActive="active">
            Películas
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavBarComponent {} 