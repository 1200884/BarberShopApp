import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../_services/places.service';

@Component({
  selector: 'app-esteticistas',
  templateUrl: './esteticistas.component.html',
  styleUrls: ['./esteticistas.component.css']
})
export class EsteticistasComponent implements OnInit {
    searchTerm: string = '';
    esteticistas: any[] = [];
    esteticistasFiltrados: any[] = [];
  
    constructor(private placeService: PlacesService) {}
  
    ngOnInit() {
      this.carregarEsteticistas();
    }
  
    carregarEsteticistas() {
      this.placeService.getEsteticistas().subscribe(
        (data: any) => {
          this.esteticistas = data;
          this.filtrarEsteticistas();
        },
        error => {
          console.error('Erro ao buscar esteticistas:', error);
        }
      );
    }
  
    filtrarEsteticistas() {
      if (!this.searchTerm) {
        this.esteticistasFiltrados = this.esteticistas;
      } else {
        const termoLowerCase = this.searchTerm.toLowerCase();
        this.esteticistasFiltrados = this.esteticistas.filter(esteticista =>
          esteticista.name.toLowerCase().includes(termoLowerCase)
        );
      }
    }
  }
  