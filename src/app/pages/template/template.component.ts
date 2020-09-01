import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PaisService } from './../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  public usuario = {
    nombre: 'Jorge',
    apellido: 'Torres',
    correo: 'jorge@example.com',
    pais: 'COL',
    genero: 'M'
  }
  public paises: any[] = [];

  constructor(private pais: PaisService) { }

  ngOnInit(): void {
    this.pais.getPaises().subscribe((paises: any) => {
      this.paises = paises;
    });
  }

  public guardar(formulario: NgForm): void {
    if (formulario.invalid) {
      Object.values(formulario.controls).forEach((ctrl) => {
        ctrl.markAsTouched();
      });
      return;
    }
  }

}
