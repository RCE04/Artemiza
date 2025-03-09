import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonButton, IonButtons, IonFooter, IonCol, IonRow } from '@ionic/angular/standalone';
import { EsculService } from '../escul.service';
import { Escultura } from '../esculInterface';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true,
  imports: [IonCol, IonButton, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule ,IonButtons, RouterModule, IonFooter, IonRow]
})
export class DetallePage implements OnInit {
  escultura: Escultura | undefined;

  constructor(private route: ActivatedRoute, private esculturaService: EsculService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarEscultura(id);
  }

  cargarEscultura(id: number) {
    this.esculturaService.getEsculturas().subscribe(data => {
      this.escultura = data.find(e => e.id === id);
    });
  }
}