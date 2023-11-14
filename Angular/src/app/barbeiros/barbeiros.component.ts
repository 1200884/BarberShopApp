import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../_services/places.service';

@Component({
  selector: 'app-barbeiros',
  templateUrl: './barbeiros.component.html',
  styleUrls: ['./barbeiros.component.css']
})
export class BarbeirosComponent implements OnInit{
  searchTerm: string = '';
  barbeiros: any[] = [];
  barbeirosFiltrados: any[] = [];

  constructor(private placeService: PlacesService) {}

  ngOnInit() {
    this.carregarBarbeiros();
  }

  carregarBarbeiros() {
    this.placeService.getBarbeiros().subscribe(
      (data: any) => {
        this.barbeiros = data;
        this.filtrarBarbeiros();
      },
      error => {
        console.error('Erro ao procurar barbeiros:', error);
      }
    );
  }

  filtrarBarbeiros() {
    if (!this.searchTerm) {
      this.barbeirosFiltrados = this.barbeiros;
    } else {
      const termoLowerCase = this.searchTerm.toLowerCase();
      this.barbeirosFiltrados = this.barbeiros.filter(barbeiro =>
        barbeiro.name.toLowerCase().includes(termoLowerCase)
      );
    }
  }
}

