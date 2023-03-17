import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import * as moment from 'moment';
import { fromEvent } from 'rxjs';
import { ModalIngresoService } from 'src/app/components/services/modal-ingreso.service';
import { Forma_PagoModel } from 'src/app/Formas-pago/class/forma-pago.class';
import { FormaPagoService } from 'src/app/Formas-pago/services/forma-pago.service';
import { Usuario_Model } from 'src/app/Maestros/components/usuairos/class/Usuarios.class';
import { UsuariosService } from 'src/app/Maestros/services/usuarios.service';
import { NotificacionesService } from 'src/app/services/Config/seewtAlert.service';
import { VentasService } from '../services/ventas.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [NotificacionesService]
})
export class LayoutComponent implements OnInit {

  habilitarIngreso: boolean = true;
  ventasForm!: FormGroup;
  conceptoData: any;
  usuariosData: any;
  dataDiarios: any[] = [];
  dataPlanes: any[] = [];
  pla: number = 1;
  dia: number = 1;
  totalVentasDiarias: number = 0;
  totalVentasPlanes: number = 0;
  seguridadForm!: FormGroup;
  habilitarModal: boolean = true;
  usuarios: Usuario_Model[] = [];
  formasData: Forma_PagoModel[] = [];
  @ViewChild('openSeguridad') openSeguridad!: any;
  @ViewChild('closeModalSeguridad') closeModalSeguridad!: any;
  constructor(private _formBuilder: FormBuilder, private _notifAlert: NotificacionesService, private _ventasService: VentasService,
    private _modalServices: ModalIngresoService,private _usuariosService: UsuariosService, private route: Router,
    private _formaPagoService: FormaPagoService) { }

  ngOnInit(): void {
    this.InicializarFromularioVentas();
    this.initialiceFormSeguridad();
    this.getConceptos();
    this.getUsuarios();
    this.getFormasPago();
    localStorage.setItem('active', '0');
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
    this._modalServices.getUsuarios().subscribe(result => this.usuariosData = result);
  }

  getFormasPago() {
    this._formaPagoService.getFormasPago().subscribe(result => {this.formasData = result; console.log( this.formasData)}
    );
  }

  saveVenta() {
    if (this.ventasForm.valid) {
      if (this.ventasForm.controls.Id_Usuario.value.Estado) {
        this.ventasForm.controls.Id_Usuario.setValue(this.ventasForm.controls.Id_Usuario.value.Id_Usuario);
        const fecha_Up = new Date;
        var fecha_update_format = moment(fecha_Up.toISOString()).format("YYYY-MM-DD").toString();
        this.ventasForm.controls.Fecha_Ingreso.setValue(fecha_update_format);
        this.ventasForm.controls.Id_Concepto.setValue(this.ventasForm.controls.Id_Concepto.value.Id_Concepto);
        const hora = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
        const hora_format = moment(hora, 'H:m:s').format('h:mm a');
        this.ventasForm.controls.Hora_Venta.setValue(hora_format);
        this._ventasService.saveVentas(this.ventasForm.value).subscribe(resultSAve => {
          this.ventasForm.reset();
          this._notifAlert.Exitoso('La venta se registro con exito');
        })
      } else {
        this._notifAlert.Advertencia('El usuario se encuentra desactivado, no puede realizar ventas con este usuario.');
        this.ventasForm.controls.Id_Usuario.reset();
      }
    } else {
      this.ventasForm.markAsTouched();
    }
  }

  limpiar() {
    this.ventasForm.reset();
    this.dataDiarios = [];
    this.dataPlanes = [];
  }

  ConsultarCierre() {
    this.totalVentasDiarias = 0;
    this.totalVentasPlanes = 0;
    var idUser = this.ventasForm.controls.Id_Usuario.value;
    var dateInicial = moment(new Date().toISOString()).format("YYYY-MM-DD").toString();
    var dateFinal = moment(new Date().toISOString()).format("YYYY-MM-DD").toString();
    var data = {
      Fecha_Inicial: dateInicial,
      Fecha_Final: dateFinal,
      idUsuario: idUser
    }
    this._ventasService.GetAllVentasByUserDiarias(data).subscribe(
      result => {
        this.dataDiarios = result
        result.forEach(({ ...venta }) => {
          this.totalVentasDiarias = this.totalVentasDiarias + venta.venta.Valor_Venta;
        });
      });
    this._ventasService.GetAllVentasByUserPlanes(data).subscribe(
      result => {
        this.dataPlanes = result
        result.forEach(({ ...venta }) => {
          this.totalVentasPlanes = this.totalVentasPlanes + venta.Ventas_Cliente.Valor_Venta;
        });
      });
  }

  validarIdentidad() {
    
    if (this.seguridadForm.valid) {
      const pass = this.seguridadForm.controls.password.value;
      this._usuariosService.getUsuarios().subscribe( 
        result => {
          this.usuarios = result;
          const identidad = this.usuarios.filter( u => u.Password === pass && u.Id_Usuario === 1);
          if (identidad.length > 0) {
            this.closeModalSeguridad.nativeElement.click();

            this.route.navigateByUrl('/maestros/configuracion');
            localStorage.setItem('active', '1');
          } else {
            this._notifAlert.Advertencia('No cuenta con los permisos o el password es incorrecto');
          }
        }
      )
    } else {
      this.seguridadForm.markAllAsTouched();
    }
  }

  close() {
    this.seguridadForm.reset();
  }

  initialiceFormSeguridad() {
    this.seguridadForm = this._formBuilder.group({
      password: [null, [Validators.required]],
     
    });

  }

  InicializarFromularioVentas() {
    this.ventasForm = this._formBuilder.group({
      Id_Venta: [null,],
      Id_Concepto: [[Validators.required]],
      Id_Usuario: [null, []],
      Id_Forma_pago: [null],
      Fecha_Ingreso: [null, []],
      Valor_Venta: [null, [Validators.required]],
      Hora_Venta: [null]
    });
  }

  InicializarFromularioCierre() {
    this.ventasForm = this._formBuilder.group({
      Id_Usuario: [null, []],
    });
  }


}
