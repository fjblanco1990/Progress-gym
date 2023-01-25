import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import * as moment from 'moment';
import { fromEvent } from 'rxjs';
import { NotificacionesService } from 'src/app/services/Config/seewtAlert.service';
import { VentasService } from '../services/ventas.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers:[NotificacionesService]
})
export class LayoutComponent implements OnInit {
 
  habilitarIngreso: boolean = true;
  ventasForm!: FormGroup;
  conceptoData: any;
  constructor(private _formBuilder: FormBuilder, private _notifAlert: NotificacionesService, private _ventasService: VentasService) { }

  ngOnInit(): void {
    this.InicializarFromulario();
    this.getConceptos();
  }

  
  desactiveRegistroIngreso() {
    this.habilitarIngreso = false;
  }

  habilitarRegistroIngreso() {
    this.habilitarIngreso = true;
  }

  validarSeleccion(input: string, name_input: string) {
    if (this.ventasForm.controls[input].value === '-1') {
      this._notifAlert.Advertencia('Debe seleccionar una opcion valida');
      this.ventasForm.controls[input].reset();
    }
  }

  getConceptos() {
    this._ventasService.getConceptos().subscribe(result => this.conceptoData = result);
  }

  saveVenta() {
    if (this.ventasForm.valid) {
      this.ventasForm.controls.Id_Usuario.setValue(1);
      const fecha_Up = new Date;
      var fecha_update_format = moment(fecha_Up.toISOString()).format("YYYY-MM-DD").toString();
      this.ventasForm.controls.Fecha_Ingreso.setValue(fecha_update_format);

      this._ventasService.saveVentas(this.ventasForm.value).subscribe( resultSAve => {
        this.ventasForm.reset();
        this._notifAlert.Exitoso('La venta se registro con exito');
      })
    } else {
      this.ventasForm.markAsTouched();
    }
  }

  InicializarFromulario() {
    this.ventasForm = this._formBuilder.group({
      Id_Venta: [null, ],
      Id_Concepto: [[Validators.required]],
      Id_Usuario: [null, []],
      Fecha_Ingreso: [null, []],
      Valor_Venta: [null, [Validators.required]],
    });

  }

  

  
}
