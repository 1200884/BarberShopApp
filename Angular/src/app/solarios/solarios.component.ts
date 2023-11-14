// solarios.component.ts
import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../_services/places.service';

@Component({
  selector: 'app-solarios',
  templateUrl: './solarios.component.html',
  styleUrls: ['./solarios.component.css']
})
export class SolariosComponent implements OnInit {
  searchTerm: string = '';
  solarios: any[] = [];
  solariosFiltrados: any[] = [];

  constructor(private placeService: PlacesService) {}

  ngOnInit() {
    this.carregarSolarios();
  }

  carregarSolarios() {
    this.placeService.getSolarios().subscribe(
      (data: any) => {
        this.solarios = data;
        this.filtrarSolarios();
      },
      error => {
        console.error('Erro ao buscar solários:', error);
      }
    );
  }

  filtrarSolarios() {
    if (!this.searchTerm) {
      this.solariosFiltrados = this.solarios;
    } else {
      const termoLowerCase = this.searchTerm.toLowerCase();
      this.solariosFiltrados = this.solarios.filter(solario =>
        solario.name.toLowerCase().includes(termoLowerCase)
      );
    }
  }
}
