import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PatternsService } from 'src/app/services/Config/patterns.service';
import { NotificacionesService } from 'src/app/services/Config/seewtAlert.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { Informe_fechas } from '../../interfaces/informes.interface';
import { Ingreso_completo } from '../../interfaces/ingresos.interface';
import { IngresoService } from '../../services/ingreso.service';

@Component({
  selector: 'app-registrar-ingresos',
  templateUrl: './registrar-ingresos.component.html',
  styleUrls: ['./registrar-ingresos.component.scss'],
  providers: [IngresoService,PatternsService,NotificacionesService]
})
export class RegistrarIngresosComponent implements OnInit {
   
  @ViewChild('openModal', {static: true}) openModalInformation!: ElementRef;
  informesForm!: FormGroup;
  fechaActual!: Date;
  habilitarModal: boolean = true;
  config: any;
  p: number = 1;
  venta: number = 1;
  datesSend!: Informe_fechas;
  informeGeneral: any;
  resultVentas = { 
    informeData: [],
    informeVenta: [
      {
        descripcion: '',
        value: 0
      }
    ]
  }
  conceptosData: any[] = [];
  resultVentasSuminitros = 0;
  Totla_ingresosDia = 0;
  tipoConsulta!: number;
  constructor(
    private _formBuilder: FormBuilder, 
    private _patternsService: PatternsService, 
    private _ingresoService : IngresoService,
    private _notifcaciones: NotificacionesService,
    private _ventasService: VentasService) { 
     
    }

  ngOnInit(): void {
    this.InicializarFromulario();
    this.getConceptos();
  }

  pageChanged(event: any){
    this.config.currentPage = event;
  }

  reset() {
    this.informesForm.reset();
  }

  OpenModalInformation(tipo: number) {
    this.tipoConsulta = tipo;
    if (tipo === 0) {
      this.ObtenerVentasDiarias();
    } else {
      this.ObtenerIngresosDiarios();
    }
  }

  ObtenerIngresosDiarios() {
    if (this.informesForm.valid) {
      this.datesSend = new Informe_fechas();
      this.datesSend.Fecha_Inicial = this.informesForm.controls.FechaInicial.value;
      this.datesSend.Fecha_Final =  this.informesForm.controls.FechaFinal.value;
      this._ingresoService.getIngresosDiarios(this.datesSend).subscribe( result =>{
      
       this.resultVentas.informeData = result;
       this.openModalInformation.nativeElement.click();
      });
    } else {
      this.informesForm.markAllAsTouched();
      this._notifcaciones.Advertencia('Debe seleccionar un rango de fechas para realizar la consulta');
    }
  }

  ObtenerVentasDiarias() {
    if (this.informesForm.valid) {
      this.resultVentas.informeVenta = [];
      this.datesSend = new Informe_fechas();
      this.datesSend.Fecha_Inicial = this.informesForm.controls.FechaInicial.value;
      this.datesSend.Fecha_Final =  this.informesForm.controls.FechaFinal.value;
      this._ingresoService.getVentasDiarias(this.datesSend).subscribe( result => {
        this.resultVentas.informeData = result;
        this._ventasService.GetVentasAll().subscribe( result => {
          result.forEach((venta: any) => {
            const conpdata = this.conceptosData.find(c => c.Id_Concepto == venta.Id_Concepto);
            const infoVenta = {
                descripcion: conpdata === undefined  ? '' : conpdata.Descripcion,
                value: venta.Valor_Venta
              }
            
            this.resultVentas.informeVenta.push(infoVenta);
          });
          
          this.openModalInformation.nativeElement.click();
        })
        
      });
      
    } else {
      this.informesForm.markAllAsTouched();
      this._notifcaciones.Advertencia('Debe seleccionar un rango de fechas para realizar la consulta')
    }
  }

  getConceptos() {
    this._ventasService.getConceptos().subscribe( result => this.conceptosData = result);
  }

  getInformeDiarioGeneral() {
    if (this.informesForm.valid) {
      this.resultVentasSuminitros = 0;
      this.resultVentas.informeVenta = [];
        this.datesSend = new Informe_fechas();
        this.datesSend.Fecha_Inicial = this.informesForm.controls.FechaInicial.value;
        this.datesSend.Fecha_Final =  this.informesForm.controls.FechaFinal.value;
        this._ingresoService.getInformeDiarioGeneral(this.datesSend).subscribe( result => this.informeGeneral = result);
        this._ventasService.GetVentasAll().subscribe( result => {
          result.forEach((venta: any) => {
            this.resultVentasSuminitros = this.resultVentasSuminitros + venta.Valor_Venta;
            const conpdata = this.conceptosData.find(c => c.Id_Concepto == venta.Id_Concepto);
            
            this.Totla_ingresosDia = venta.Id_Concepto === 6 ? this.Totla_ingresosDia+1: this.Totla_ingresosDia+0;
           
            const infoVenta = {
                descripcion: conpdata === undefined  ? '' : conpdata.Descripcion,
                value: venta.Valor_Venta
              }
            
            this.resultVentas.informeVenta.push(infoVenta);
          });
      
        })
    } else {
      this.informesForm.markAllAsTouched();
    }
  
  }

  desactiveRegistroIngreso() {
    this.habilitarModal = false;
  }

  habilitarRegistroIngreso() {
    this.habilitarModal = true;
  }

  InicializarFromulario() {
    this.informesForm = this._formBuilder.group({
      FechaInicial: [null, [Validators.required]],
      FechaFinal: [null, [Validators.required]],
    });
  }

}
