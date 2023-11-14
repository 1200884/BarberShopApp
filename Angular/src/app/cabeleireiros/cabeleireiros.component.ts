import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../_services/places.service';


@Component({
  selector: 'app-cabeleireiros',
  templateUrl: './cabeleireiros.component.html',
  styleUrls: ['./cabeleireiros.component.css']
})
export class CabeleireirosComponent implements OnInit {
  searchTerm: string = '';
  cabeleireiros: any[] = [];
  cabeleireirosFiltrados: any[] = [];

  constructor(private placeService: PlacesService) {}

  ngOnInit() {
    this.carregarCabeleireiros();
  }

  carregarCabeleireiros() {
    this.placeService.getCabeleireiros().subscribe(
      (data: any) => {
        this.cabeleireiros = data;
        this.filtrarCabeleireiros();
      },
      error => {
        console.error('Erro ao buscar cabeleireiros:', error);
      }
    );
  }

  filtrarCabeleireiros() {
    if (!this.searchTerm) {
      this.cabeleireirosFiltrados = this.cabeleireiros;
    } else {
      const termoLowerCase = this.searchTerm.toLowerCase();
      this.cabeleireirosFiltrados = this.cabeleireiros.filter(cabeleireiro =>
        cabeleireiro.name.toLowerCase().includes(termoLowerCase)
      );
    }
  }
}
