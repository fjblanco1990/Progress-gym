import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Clientes_Completo } from 'src/app/Clientes/interfaces/clientes.interfaces';
import { PatternsService } from 'src/app/services/Config/patterns.service';
import { NotificacionesService } from 'src/app/services/Config/seewtAlert.service';
import { Ingreso, Ingreso_completo } from '../../interfaces/ingresos.interface';
import { IngresoService } from '../../services/ingreso.service';

@Component({
  selector: 'app-consultar-ingresos',
  templateUrl: './consultar-ingresos.component.html',
  styleUrls: ['./consultar-ingresos.component.scss'],
  providers:[IngresoService,PatternsService,NotificacionesService]
})
export class ConsultarIngresosComponent implements OnInit {
  data: Ingreso_completo[] = []
  clientesModelLst: Ingreso_completo[] = [];
  // clientesModelLstSearch: Clientes_Completo[] = [];
  // clientesCompleto: Clientes_Completo = new Clientes_Completo();
  // clientesModel!: Clientes;
  consultarIngresosForm!: UntypedFormGroup;
  fechaActual!: Date;
  habilitarModal: boolean = true;
  config: any;
  p: number = 1;
  constructor(
    private _formBuilder: UntypedFormBuilder, 
    private _patternsService: PatternsService, 
    private _notifAlert: NotificacionesService,

    private _router: Router,
    private _ingresoService : IngresoService) { 
     
    }

  ngOnInit(): void { 
    
    this.InicializarFromulario();
    this.getAllIngresos();
    localStorage.setItem('active', '0');
  }

  pageChanged(event: any){
    this.config.currentPage = event;
  }

  getAllIngresos() {
    this.fechaActual = new Date();
    this._ingresoService.getIngresosLogAll().subscribe(
      result => {
        this.data = result;
        this.clientesModelLst = result;
      }
    )
  }
  
  filterNombre(nombre: string) {
    this.data = this.clientesModelLst;
    if (nombre) {
       var result = this.data.filter(c => c.cliente.Nombres.toUpperCase().includes(nombre.toUpperCase()));
       this.data = result;
    }
  }

  filtrarDocumento(documento: string) {
    this.data = this.clientesModelLst;
    if (documento) {
       var result = this.data.filter(c => c.cliente.Documento_identitdad.includes(documento));
       this.data = result;
    }
  }


  filterRangoFechas(FechaInit: string, Fecha_fin: string) {
    var fechaInicialFormat = moment(FechaInit.toString()).format('YYYY/MM/DD').toString();
    var fechaFinalFormat = moment(Fecha_fin.toString()).format('YYYY/MM/DD').toString();
    this.data = this.clientesModelLst;
    if (FechaInit && Fecha_fin) {
       var result = this.data.filter(c => 
        
          moment(c.ingreso.Fecha_Ingreso.toString()).format('YYYY/MM/DD').toString() >= fechaInicialFormat  
          && 
          moment(c.ingreso.Fecha_Ingreso.toString()).format('YYYY/MM/DD').toString() <= fechaFinalFormat 
         
        )
       this.data = result;
    }
  }

  reset() {
    this.data = this.clientesModelLst;
    this.consultarIngresosForm.reset();
  }

  desactiveRegistroIngreso() {
    this.habilitarModal = false;
  }

  habilitarRegistroIngreso() {
    this.habilitarModal = true;
  }  

  InicializarFromulario() {
    this.consultarIngresosForm = this._formBuilder.group({
      Nombre: [null],
      Documento: [null, [Validators.pattern(this._patternsService.patternOnlyStringSpace)]],
      FechaInicial: [null, [ Validators.pattern(this._patternsService.patternOnlyStringSpace)]],
      FechaFinal: [null, [ Validators.pattern(this._patternsService.patternOnlyStringSpace)]],
    });

  }

}
