import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonList, IonThumbnail, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonButtons, IonIcon, IonInput, IonSelect, IonSelectOption, IonCol, IonFooter } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { EsculService } from '../escul.service';
import { Escultura } from '../esculInterface';

@Component({
  selector: 'app-escul',
  templateUrl: './escul.page.html',
  styleUrls: ['./escul.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonList,
    IonThumbnail,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    RouterModule,
    IonGrid,
    IonRow,
    IonButtons,
    IonIcon,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonCol,
    IonFooter
  ]
})
export class EsculPage implements OnInit {
  esculturas: Escultura[] = [];

  // Propiedades para filtros
  filterName: string = '';
  filterPrice: string = '';
  // Para el estado: 'all' (todos), 'sold' (vendidos) o 'unsold' (no vendidos)
  filterVendido: string = 'all';
  filterAlto: string = '';
  filterAncho: string = '';
  // Orden de precio: 'asc' o 'desc'
  orderPrice: string = 'asc';

  constructor(private esculturaService: EsculService) {}

  ngOnInit() {
    this.cargarEsculturas();
  }

  cargarEsculturas() {
    this.esculturaService.getEsculturas().subscribe(data => {
      this.esculturas = data;
    });
  }

  // Getter que aplica todos los filtros y ordena por precio
// Getter que aplica todos los filtros y ordena primero por estado (no vendidos al inicio) y luego por precio
get filteredEsculturas(): Escultura[] {
  let filtered = this.esculturas;

  // Filtro por nombre
  if (this.filterName.trim()) {
    filtered = filtered.filter(e =>
      e.nombreEscultura.toLowerCase().includes(this.filterName.toLowerCase())
    );
  }

  // Filtro por precio (substring)
  if (this.filterPrice.trim()) {
    filtered = filtered.filter(e =>
      e.precio.toLowerCase().includes(this.filterPrice.toLowerCase())
    );
  }

  // Filtro por estado de venta
  if (this.filterVendido !== 'all') {
    const isSold = this.filterVendido === 'sold';
    filtered = filtered.filter(e => e.vendido === isSold);
  }

  // Filtro por Alto
  if (this.filterAlto.trim()) {
    filtered = filtered.filter(e =>
      e.alto.toLowerCase().includes(this.filterAlto.toLowerCase())
    );
  }

  // Filtro por Ancho
  if (this.filterAncho.trim()) {
    filtered = filtered.filter(e =>
      e.ancho.toLowerCase().includes(this.filterAncho.toLowerCase())
    );
  }

  // Ordenar primero para que los no vendidos aparezcan primero, y luego por precio
  filtered.sort((a, b) => {
    // Ordenar por estado: si uno está vendido y el otro no, el no vendido debe aparecer primero.
    if (a.vendido !== b.vendido) {
      return a.vendido ? 1 : -1;
    }
    // Si ambos tienen el mismo estado, ordenar por precio
    const priceA = parseFloat(a.precio) || 0;
    const priceB = parseFloat(b.precio) || 0;
    return this.orderPrice === 'asc' ? priceA - priceB : priceB - priceA;
  });

  return filtered;
}
}