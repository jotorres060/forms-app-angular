import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  public noTorres(control: FormControl): {[s: string]: boolean} {
    if (control.value.toLowerCase() === 'torres') {
      return {
        noTorres: true
      }
    }

    return null;
  }

  public passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Ctrl = formGroup.controls[pass1Name];
      const pass2Ctrl = formGroup.controls[pass2Name];

      if (pass1Ctrl.value === pass2Ctrl.value) {
        pass2Ctrl.setErrors(null);
      } else {
        pass2Ctrl.setErrors({ noEsIgual: true });
      }
    }
  }
}
