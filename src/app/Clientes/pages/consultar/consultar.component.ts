import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PatternsService } from 'src/app/services/Config/patterns.service';
import { NotificacionesService } from 'src/app/services/Config/seewtAlert.service';
import { Clientes, Clientes_Completo } from '../../interfaces/clientes.interfaces';
import { ClientesService } from '../../services/clientes.service';
import { Router } from '@angular/router';
import { SendDataComponentsService } from '../../services/send-data-componentes.service';
import { IngresoService } from '../../../Ingresos/services/ingreso.service';
import { ModalIngresoService } from 'src/app/components/services/modal-ingreso.service';
import { PlanModel } from 'src/app/components/class/planes.class';
import { Observable } from 'rxjs';
import { UsuariosService } from '../../../Maestros/services/usuarios.service';
import { Usuario_Model } from '../../../Maestros/components/usuairos/class/Usuarios.class';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss'],
  providers:[ ClientesService,PatternsService, NotificacionesService]
})
export class ConsultarComponent implements OnInit {
  clientesModelLst: Clientes_Completo[] = [];
  clientesModelLstSearch: Clientes_Completo[] = [];
  clientesCompleto: Clientes_Completo = new Clientes_Completo();
  clientesModel!: Clientes;
  consultarClientForm!: FormGroup;
  fechaActual!: Date;
  habilitarModal: boolean = true;
  palabra: string  = '';
  p: number = 1;
  planData: PlanModel[] = [];
  usuariosData: Usuario_Model[] = [];
  constructor(private _clientesService: ClientesService,
    private _formBuilder: FormBuilder, 
    private _patternsService: PatternsService, 
    private _notifAlert: NotificacionesService,
    private _sendDataComponentsService: SendDataComponentsService,
    private _ingresoService: IngresoService,
    private _modalIngresoService: ModalIngresoService,
    private _usuariosService: UsuariosService,
    private _router: Router) { 
    }

  ngOnInit(): void { 
    this.InicializarFromulario();
    this.getPlanes();
    this.getUsuarios();
    localStorage.setItem('active', '0');
  }

  getAllClients() {
  this.fechaActual = new Date();
    this._clientesService.getClientesAll().subscribe(
      data => {
        data.forEach(cliente => {
            
            this._ingresoService.getIngreosById(cliente.cliente.Id_Cliente).subscribe(
                resultIngreso => {
                  this.clientesCompleto = new Clientes_Completo();
                  this.clientesCompleto.cliente = cliente.cliente;
                  this.clientesCompleto.forma_pago = cliente.forma_pago;
                  this.clientesCompleto.plan = cliente.plan;
                  this.clientesCompleto.usuario = cliente.usuario;
                  this.clientesCompleto.porVencer = (this.ObtenerDiasTranscurridos( this.fechaActual.toString(), cliente.cliente.Fecha_fin.toString())) <= 3  ? true: false;
                  var fehcaActualFormat = moment(this.fechaActual.toString()).format('YYYY/MM/DD').toString();
                  var fechaFinalFormat = moment(cliente.cliente.Fecha_fin.toString()).format('YYYY/MM/DD').toString();
                  this.clientesCompleto.Vencido = fehcaActualFormat <=  fechaFinalFormat? false: true;
                  if (cliente.plan.Id_Plan === 2) {
                    let plan = this.planData.filter(c => c.Id_Plan == cliente.cliente.Id_Plan).find(c => c.Id_Plan == cliente.cliente.Id_Plan)?.Cantidad_Dias;
                    if (plan) {
                      const ingresos = resultIngreso.length;
                      this.clientesCompleto.DiasFaltantes = (plan - ingresos);
                      this.clientesCompleto.palabra = 'Ingresos';
                      if (this.clientesCompleto.DiasFaltantes === 0) {
                        this.clientesCompleto.Vencido = true;
                        this.clientesCompleto.porVencer = true;
                      } else if (this.clientesCompleto.DiasFaltantes <= 3) {
                        this.clientesCompleto.Vencido = false;
                        this.clientesCompleto.porVencer = true;
                      }
                    }
                  } else {
                    this.clientesCompleto.DiasFaltantes =  (this.ObtenerDiasTranscurridos( this.fechaActual.toString(), cliente.cliente.Fecha_fin.toString()));
                    this.clientesCompleto.palabra = 'días';
                    if (this.clientesCompleto.DiasFaltantes <= 0) {
                      this.clientesCompleto.Vencido = true;
                      this.clientesCompleto.porVencer = true;
                    } else if (this.clientesCompleto.DiasFaltantes <= 3) {
                      this.clientesCompleto.Vencido = false;
                        this.clientesCompleto.porVencer = true;
                    }
                  }
                  this.clientesModelLst.push(this.clientesCompleto);
                  this.clientesModelLstSearch.push(this.clientesCompleto);
            })
           
        });
      }
    );
  }

  getPlanes() {
    this._modalIngresoService.getPlanes().subscribe((p:any) => {
      this.planData = p;
      this.getAllClients();
    });
  }

  getUsuarios() {
    this._usuariosService.getUsuarios().subscribe( usuario => this.usuariosData = usuario);
  }

  filterRangoFechas(FechaInit: string) {
    var fechaInicialFormat = moment(FechaInit.toString()).format('YYYY/MM/DD').toString();
    this.clientesModelLstSearch = this.clientesModelLst;
    if (FechaInit) 
      this.clientesModelLstSearch = this.clientesModelLstSearch.filter(c => 
        moment(c.cliente.Fecha_registro.toString()).format('YYYY/MM/DD').toString() >= fechaInicialFormat)
  }

  reset() {
    this.clientesModelLstSearch = this.clientesModelLst;
    this.consultarClientForm.reset();
  }

  filterNombre(nombre: string) {
    this.clientesModelLstSearch = this.clientesModelLst;
    if (nombre) 
      this.clientesModelLstSearch = this.clientesModelLstSearch.filter(c => c.cliente.Nombres.toUpperCase().includes(nombre.toUpperCase()));   
  }

  filtrarDocumento(documento: string) {
    this.clientesModelLstSearch = this.clientesModelLst;
    if (documento) 
      this.clientesModelLstSearch = this.clientesModelLstSearch.filter(c => c.cliente.Documento_identitdad.includes(documento));
  }

  filtrarUsuario() {
    var usuario = this.consultarClientForm.controls.Usuario.value.Id_Usuario;
    this.clientesModelLstSearch = this.clientesModelLst;
    if (usuario) 
      this.clientesModelLstSearch = this.clientesModelLstSearch.filter(c => c.usuario.Id_Usuario === usuario);
  }

  ObtenerDiasTranscurridos(fechaInicial: string, fechaFinal: string): number {
    var dateFormat1 = moment(fechaInicial).format('YYYY/MM/DD').toString();
    var dateFormat2 = moment(fechaFinal).format('YYYY/MM/DD').toString();
    var fecha1 = moment(dateFormat1);
    var fecha2 = moment(dateFormat2);
    return fecha2.diff(fecha1, 'days');
  }

  editarCliente(cliente: Clientes_Completo) {
    this._sendDataComponentsService.sendInformationUCliente(cliente);
    this._router.navigateByUrl('/clientes/registrarclientes/1');
  }

  desactiveRegistroIngreso() {
    this.habilitarModal = false;
  }

  habilitarRegistroIngreso() {
    this.habilitarModal = true;
  }  

  validarSeleccion(input: string, name_input: string) {
    if (this.consultarClientForm.controls[input].value === '-1') {
      this._notifAlert.Advertencia('Debe seleccionar una opcion valida');
      this.consultarClientForm.controls[input].reset();
    }
  }

  InicializarFromulario() {
    this.consultarClientForm = this._formBuilder.group({
      Nombre: [null],
      Documento: [null, [Validators.pattern(this._patternsService.patternOnlyStringSpace)]],
      FechaInicial: [null, [ Validators.pattern(this._patternsService.patternOnlyStringSpace)]],
      FechaFinal: [null, [ Validators.pattern(this._patternsService.patternOnlyStringSpace)]],
      Usuario:[null]
    });

  }
}


