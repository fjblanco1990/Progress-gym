import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PatternsService } from 'src/app/services/Config/patterns.service';
import { NotificacionesService } from 'src/app/services/Config/seewtAlert.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { Informe_fechas } from '../../interfaces/informes.interface';
import { Ingreso_completo } from '../../interfaces/ingresos.interface';
import { IngresoService } from '../../services/ingreso.service';
import { UsuariosService } from '../../../Maestros/services/usuarios.service';
import { Usuario_Model } from '../../../Maestros/components/usuairos/class/Usuarios.class';
import { ConceptoModel } from '../../../components/class/conceptos.class';

@Component({
  selector: 'app-registrar-ingresos',
  templateUrl: './registrar-ingresos.component.html',
  styleUrls: ['./registrar-ingresos.component.scss'],
  providers: [IngresoService,PatternsService,NotificacionesService]
})
export class RegistrarIngresosComponent implements OnInit {
   
  @ViewChild('openModalIngresos', {static: true}) openModalIngresos!: ElementRef;
  @ViewChild('openModalVentas', {static: true}) openModalVentas!: ElementRef;
  @ViewChild('openModalPlanes', {static: true}) openModalPlanes!: ElementRef;
  @ViewChild('openModalHistorico', {static: true}) openModalHistorico!: ElementRef;
  informesForm!: UntypedFormGroup;
  filterForm!: UntypedFormGroup;
  fechaActual!: Date;
  habilitarModal: boolean = true;
  config: any;
  ing: number = 1;
  venta: number = 1;
  plan: number = 1
  hist: number = 1;
  datesSend!: Informe_fechas;
  informeGeneral: any;
  resultVentas = { 
    informeData: [],
    informeVenta: [
      {
        // venta: [
        //   {
        //     NameCliente : ''
        //   }
        // ],
        descripcion: '',
        value: 0
      }
    ],
    informePlanes: [

    ],
    informeHistorico: [
      {
        descripcion: '',
        value: 0,
        usuario: '',
        Fecha_Ingreso: '',
        Hora: ''
      }
    ]
  }

  informeVenta: any[] = [];
  conceptosData: ConceptoModel[] = [];
  usuariosData: Usuario_Model[] = [];
  resultVentasSuminitros = 0;
  Totla_ingresosDia = 0;
  totalVentasDiarias = 0;
  totalPlanesDiarios = 0;
  totalIngresoUnicoDiarios = 0;
  tipoConsulta!: number;
  page = 0;
  pageOne = 1;
  pageTwo = 1;
  pageThree = 1;
  pageSize = 4;
  collectionSize = 0;
  collectionSizeOne = 0;
  collectionSizeTwo = 0;
  collectionSizeThree = 0;
  constructor(
    private _formBuilder: UntypedFormBuilder,  
    private _ingresoService : IngresoService,
    private _ventasService: VentasService,
    private _usuariosService: UsuariosService) { 
     
    }

  ngOnInit(): void {
    this.InicializarFromulario();
    this.InicializarFromularioFilter();
    this.getConceptos();
    this.getUsuarios();
    localStorage.setItem('active', '0');
  }

  pageChanged(event: any){
    this.config.currentPage = event;
  }

  reset() {
    this.informesForm.reset();
  }

  ObtenerIngresosDiarios() {
     this.resultVentas.informeData = [];
      this.datesSend = new Informe_fechas();
      const dateFormat = moment(new Date().toISOString()).format("YYYY-MM-DD").toString();
      this.datesSend.Fecha_Inicial = dateFormat;
      this.datesSend.Fecha_Final =   dateFormat;
      this._ingresoService.getIngresosDiarios(this.datesSend).subscribe( result =>{
      
       this.resultVentas.informeData = result;
       this.collectionSize= this.resultVentas.informeData.length;
       this.openModalIngresos.nativeElement.click();
      });
  }

  ObtenerVentasDiarias() {

      this.resultVentas.informeVenta = [];
      this.totalVentasDiarias = 0;
      this.datesSend = new Informe_fechas();
      const dateFormat = moment(new Date().toISOString()).format("YYYY-MM-DD").toString();
      this.datesSend.Fecha_Inicial = dateFormat;
      this.datesSend.Fecha_Final =   dateFormat;
      this._ventasService.GetVentasUnicasDiarias(this.datesSend).subscribe( result => {
        this.resultVentas.informeVenta = result;
        // this.informeVenta = r
        console.log('VENTASDIARIAS', this.resultVentas.informeVenta);
        
        result.forEach(({...venta}) => {
          this.totalVentasDiarias = this.totalVentasDiarias + venta['venta'].Valor_Venta;
        });
        this.collectionSizeOne = this.resultVentas.informeVenta.length;
        this.openModalVentas.nativeElement.click();
      });

  }

  // filtrarVentaByCliente(cliente: string) {
   
  //   if (cliente) 

  //   this.resultVentas.informeVenta.forEach(infoVenta => {
  //     this.resultVentas.informeVenta = infoVenta.venta.filter(v => v.NameCliente.includes(cliente))
  //   });

  // }

  ObtenerPlanesDiarios() {
    this.resultVentas.informePlanes = [];
    this.totalPlanesDiarios = 0;
    this.datesSend = new Informe_fechas();
    const dateFormat = moment(new Date().toISOString()).format("YYYY-MM-DD").toString();
    this.datesSend.Fecha_Inicial = dateFormat;
    this.datesSend.Fecha_Final =   dateFormat;
    this._ventasService.GetVentasPlanesDiarios(this.datesSend).subscribe( result => {
      this.resultVentas.informePlanes = result;
      console.log('VPLAN',this.resultVentas.informePlanes);
      
      result.forEach(({...ventasClientes }) => {
        this.totalPlanesDiarios = this.totalPlanesDiarios + ventasClientes['ventasClientes'].Valor_Venta;
      });
      this.collectionSizeTwo = this.resultVentas.informePlanes.length;
      this.openModalPlanes.nativeElement.click();
    })
  }

  ObtenerHistoricoVentas() {
    this.resultVentas.informeHistorico = [];
    this._ventasService.GetVentasAll().subscribe( result => {
      console.log('VENTAH',result);
      
      result.forEach((venta: any) => {
        const conpdata = this.conceptosData.find(c => c.Id_Concepto == venta.Id_Concepto);
        const userData = this.usuariosData.find( c => c.Id_Usuario == venta.Id_Usuario)
        const infoVenta = {
            descripcion: conpdata === undefined  ? '' : conpdata.Descripcion,
            cliente: venta.NameCliente === null ? '' : venta.NameCliente,
            value: venta.Valor_Venta,
            usuario: userData === undefined ? '': userData?.Nombre_completo,
            Fecha_Ingreso: venta.Fecha_Ingreso,
            Hora: venta.Hora_Venta
          }
        
        this.resultVentas.informeHistorico.push(infoVenta);
      });
      console.log('HISTO',this.resultVentas.informeHistorico);
      
      this.collectionSizeThree = this.resultVentas.informeHistorico.length;
      this.openModalHistorico.nativeElement.click();
    })
  }

  getConceptos() {
    this._ventasService.getConceptos().subscribe( result => this.conceptosData = result);
  }

  getUsuarios() {
    this._usuariosService.getUsuarios().subscribe( result => this.usuariosData = result);
  }

  getInformeDiarioGeneral() {
    this.resultVentasSuminitros = 0;
    this.Totla_ingresosDia = 0;
    this.totalIngresoUnicoDiarios = 0;
    this.informeGeneral = [];
    if (this.informesForm.valid) {
     
      this.resultVentas.informeVenta = [];
        this.datesSend = new Informe_fechas();
        this.datesSend.Fecha_Inicial = this.informesForm.controls['FechaInicial'].value;
        this.datesSend.Fecha_Final =  this.informesForm.controls['FechaFinal'].value;
        this._ingresoService.getInformeDiarioGeneral(this.datesSend).subscribe( result => this.informeGeneral = result);
        this._ventasService.GetVentasUnicasDiarias(this.datesSend).subscribe( result => {
          result.forEach((venta: any) => {
            this.resultVentasSuminitros = this.resultVentasSuminitros + (venta.venta.Id_Concepto !== 6 ? venta.venta.Valor_Venta: 0);
            const conpdata = this.conceptosData.find(c => c.Id_Concepto == venta.venta.Id_Concepto);
            
            this.Totla_ingresosDia = venta.venta.Id_Concepto === 6 ? this.Totla_ingresosDia+1: this.Totla_ingresosDia+0;
           
            const infoVenta = {
                descripcion: conpdata === undefined  ? '' : conpdata.Descripcion,
                value: venta.venta.Valor_Venta
              }
            
            this.resultVentas.informeVenta.push(infoVenta);
          });
        });
        this._ingresoService.getInformeIngresosVentasDiarios(this.datesSend).subscribe( result => {
          result.forEach((diarios: any) => {
            this.totalIngresoUnicoDiarios = this.totalIngresoUnicoDiarios + diarios.venta.Valor_Venta;
          })
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

  InicializarFromularioFilter() {
    this.filterForm = this._formBuilder.group({
      nameClient: [null],
    });

  }

}
