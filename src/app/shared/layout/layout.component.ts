import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import * as moment from 'moment';
import { fromEvent } from 'rxjs';
import { ModalIngresoService } from 'src/app/components/services/modal-ingreso.service';
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
  usuariosData: any;
  constructor(private _formBuilder: FormBuilder, private _notifAlert: NotificacionesService, private _ventasService: VentasService,
    private _modalServices: ModalIngresoService) { }

  ngOnInit(): void {
    this.InicializarFromulario();
    this.getConceptos();
    this.getUsuarios();
  }

  
  desactiveRegistroIngreso() {
    this.habilitarIngreso = false;
  }

  habilitarRegistroIngreso() {
    this.habilitarIngreso = true;
  }

  validarSeleccion(input: string, name_input: string) {
    if (this.ventasForm.controls[input].value.Id_Concepto === '-1') {
      this._notifAlert.Advertencia('Debe seleccionar una opcion valida');
      this.ventasForm.controls[input].reset();
    } else {
      this.ventasForm.controls.Valor_Venta.setValue(this.ventasForm.controls[input].value.valor_concepto)
    }
    
  }

  getConceptos() {
    this._ventasService.getConceptos().subscribe(result => this.conceptoData = result);
  }
  getUsuarios() {
    this._modalServices.getUsuarios().subscribe( result => this.usuariosData = result);
  }
  saveVenta() {
    if (this.ventasForm.valid) {
      if (this.ventasForm.controls.Id_Usuario.value.Estado) {
        this.ventasForm.controls.Id_Usuario.setValue(this.ventasForm.controls.Id_Usuario.value.Id_Usuario);
        const fecha_Up = new Date;
        var fecha_update_format = moment(fecha_Up.toISOString()).format("YYYY-MM-DD").toString();
        this.ventasForm.controls.Fecha_Ingreso.setValue(fecha_update_format);
        this.ventasForm.controls.Id_Concepto.setValue(this.ventasForm.controls.Id_Concepto.value.Id_Concepto);
        const hora = new Date().getHours().toString() + ':'+ new Date().getMinutes().toString();
        const hora_format = moment(hora,'H:m:s').format('h:mm a');
        this.ventasForm.controls.Hora_Venta.setValue(hora_format);
        this._ventasService.saveVentas(this.ventasForm.value).subscribe( resultSAve => {
          this.ventasForm.reset();
          this._notifAlert.Exitoso('La venta se registro con exito');
        })
    } else {
        this._notifAlert.Advertencia('El usuario se encuentra desactivado, no puede realizar ventas con este usuario.');
        this.ventasForm.reset();
    }
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
      Hora_Venta: [null]
    });

  }

  

  
}
