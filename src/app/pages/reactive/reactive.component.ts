import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { ValidadoresService } from './../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  public frm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _validadores: ValidadoresService
  ) {
    this.crearFrm();
    this.cargarData();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  cargarData() {
    this.frm.reset({
      nombre: 'Jorge',
      apellido: 'Torres',
      correo: 'jorge@example.com',
      direccion: {
        distrito: 'Valle',
        ciudad: 'Cali'
      }
    })
  }

  get pasatiempos() {
    return this.frm.get('pasatiempos') as FormArray;
  }

  get nombreInvalido() {
    return this.frm.get('nombre').invalid && this.frm.get('nombre').touched;
  }

  get apellidoInvalido() {
    return this.frm.get('apellido').invalid && this.frm.get('apellido').touched;
  }

  get correoInvalido() {
    return this.frm.get('correo').invalid && this.frm.get('correo').touched;
  }

  get pass1Invalido() {
    return this.frm.get('pass1').invalid && this.frm.get('pass1').touched;
  }

  get pass2Invalido() {
    const pass1 = this.frm.get('pass1').value;
    const pass2 = this.frm.get('pass2').value;

    return (pass1 !== pass2) ? true : false;
  }

  get distritoInvalido() {
    return this.frm.get('direccion.distrito').invalid && this.frm.get('direccion.distrito').touched;
  }

  get ciudadInvalido() {
    return this.frm.get('direccion.ciudad').invalid && this.frm.get('direccion.ciudad').touched;
  }

  public agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control('', Validators.required));
  }

  public borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  public crearListeners() {
    this.frm.get('nombre').valueChanges.subscribe((val) => console.log({ val }));
  }

  public crearFrm() {
    this.frm = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      apellido: ['', [
        Validators.required,
        Validators.minLength(5),
        this._validadores.noTorres
      ]],
      correo: ['', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]],
      pass1: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      pass2: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    }, {
      validators: this._validadores.passwordsIguales('pass1', 'pass2')
    });
  }

  public guardar() {
    if (this.frm.invalid) {
      Object.values(this.frm.controls).forEach((ctrl) => {
        if (ctrl instanceof FormGroup) {
          Object.values(ctrl.controls).forEach((ctrl) => ctrl.markAsTouched());
        } else {
          ctrl.markAsTouched();
        }
      });
      return;
    }
  }

}
