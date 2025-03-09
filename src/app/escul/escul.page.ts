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
  imports: [IonFooter, 
    IonIcon,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
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
    IonInput,
    IonSelect,
    IonSelectOption,
    IonCol
  ]
})
export class EsculPage implements OnInit {
  esculturas: Escultura[] = [];

  // Propiedades para los filtros
  filterName: string = '';
  filterPrice: string = '';
  // Para el estado, se usan tres valores: 'all' (todos), 'sold' (vendidos) y 'unsold' (no vendidos)
  filterVendido: string = 'all';

  constructor(private esculturaService: EsculService) {}

  ngOnInit() {
    this.cargarEsculturas();
  }

  cargarEsculturas() {
    this.esculturaService.getEsculturas().subscribe(data => {
      this.esculturas = data;
    });
  }

  // Getter que devuelve las esculturas filtradas y ordenadas
  get filteredEsculturas(): Escultura[] {
    let filtered = this.esculturas;

    // Filtro por nombre
    if (this.filterName) {
      filtered = filtered.filter(e =>
        e.nombreEscultura.toLowerCase().includes(this.filterName.toLowerCase())
      );
    }
    // Filtro por precio
    if (this.filterPrice) {
      filtered = filtered.filter(e =>
        e.precio.toLowerCase().includes(this.filterPrice.toLowerCase())
      );
    }
    // Filtro por estado de venta
    if (this.filterVendido !== 'all') {
      const isSold = this.filterVendido === 'sold';
      filtered = filtered.filter(e => e.vendido === isSold);
    }
    // Ordenar para que los no vendidos aparezcan primero y los vendidos al final
    filtered.sort((a, b) => {
      if (a.vendido === b.vendido) return 0;
      return a.vendido ? 1 : -1;
    });

    return filtered;
  }
}