import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PatternsService } from 'src/app/services/Config/patterns.service';
import { NotificacionesService } from 'src/app/services/Config/seewtAlert.service';
import { ClientesService } from '../../services/clientes.service';

import { FormaPagoService } from '../../../Formas-pago/services/forma-pago.service';
import { Forma_PagoModel } from 'src/app/Formas-pago/class/forma-pago.class';

import { SendDataComponentsService } from '../../services/send-data-componentes.service';
import { Clientes, Clientes_Completo, LogUsuarioModel } from '../../interfaces/clientes.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ModalIngresoService } from '../../../components/services/modal-ingreso.service';
import { PlanModel } from 'src/app/components/class/planes.class';
import { Usuario_Model } from '../../../Maestros/components/usuairos/class/Usuarios.class';
import { UsuariosService } from 'src/app/Maestros/services/usuarios.service';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
  providers: [ClientesService, PatternsService, NotificacionesService]
})

export class RegistrarComponent implements OnInit {
  @ViewChild('openGetdocumento') openDocumentoModal!: any;
  @ViewChild('openSeguridad') openSeguridad!: any;
  @ViewChild('closeModalSeguridad') closeModalSeguridad!: any;
  @ViewChild('closeModal') closeModal!: any;
  public loading = false;
  documentoString: string = '';
  documentoInput: string = '';
  openModal = true;
  registerClientForm!: UntypedFormGroup;
  seguridadForm!: UntypedFormGroup;
  habilitarModal: boolean = true;
  updateAvalible: boolean | '';
  disabledFechaInicio!: boolean | '';
  fechaInicialAntigua: string = '';
  documentoAntiguo: string  = '';
  fechaInicial: Date = new Date();
  planData: PlanModel[] = [];
  usuariosData: Usuario_Model[] = [];
  planSelect!: PlanModel;
  formasData: Forma_PagoModel[] = [];
  metodosPago: any;
  ClientModelConsulta!: any;
  reingreso: any;
  subcription!: Subscription;
  public estados = [
    {
      value: 1,
      descripcion: 'Activo'
    },
    {
      value: 0,
      descripcion: 'In activo'
    }
  ]
  value_plan_seleccionado!: PlanModel;
  value_forma_seleccionado!: Forma_PagoModel;
  isEdit: boolean = false;
  editaFechaInicial: boolean = false;
  editaDocumento: boolean = false;
  usuarios: Usuario_Model[] = [];
  logUsuario!: LogUsuarioModel;
  constructor(private _formBuilder: UntypedFormBuilder,
    private _clientesService: ClientesService,
    private _patternsService: PatternsService,
    private _notifAlert: NotificacionesService,
    private _modalServices: ModalIngresoService,
    private _formaPagoService: FormaPagoService,
    private _sendDataComponentsService: SendDataComponentsService,
    private _router: Router,
    private _Activatedroute: ActivatedRoute,
    private _usuariosService: UsuariosService
  ) {
    this.updateAvalible = false;

  }

  ngOnInit(): void {
    this.InicializarFromulario();
    this.initialiceFormSeguridad();
    this.registerClientForm.reset();
    // this.registerClientForm.get('Fecha_fin')?.disable();
    this.getPlanes();
    this.getUsuarios();
    this.getFormasPago();
    this.registerClientForm.controls['Estado'].setValue("-1");
    const edit = this._Activatedroute.snapshot.paramMap.get("edit");
    if (edit === '1') {
      this.loading = true;
      this.isEdit = true;
      this.subcription = this._sendDataComponentsService.clientDataObservable.subscribe(
        clienteModel => {
          this.MapperFormCliente(clienteModel);
        }, error => {
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
      this.isEdit = false;
      this.SetFechaRegistro();
    }

    localStorage.setItem('active', '0');

  }

  private SetFechaRegistro() {
    const fecha_Now = new Date;
    var fecha_format = moment(fecha_Now.toISOString()).format("YYYY-MM-DD").toString();
    this.registerClientForm.controls['Fecha_registro'].setValue(fecha_format);
    this.registerClientForm.controls['Fecha_inicio'].setValue(fecha_format);
    this.registerClientForm.controls['Estado'].setValue(1);
  }

  getPlanes() {
    this._modalServices.getPlanes().subscribe(result => this.planData = result);
  }

  getUsuarios() {
    this._modalServices.getUsuarios().subscribe(result => this.usuariosData = result);
  }

  getFormasPago() {
    this._formaPagoService.getFormasPago().subscribe(result => this.formasData = result);
  }

  desactiveRegistroIngreso() {
    this.habilitarModal = false;
  }

  habilitarRegistroIngreso() {
    this.habilitarModal = true;
    if (!this.isEdit) {
      this._clientesService.validDocumentCliente(this.registerClientForm.controls['Documento_identitdad'].value).subscribe(result => {
        if (result >= 1) {
          this._notifAlert.Advertencia('El numero de documento ingresado ya se encuentra registrado.');
          this.registerClientForm.controls['Documento_identitdad'].reset();
        }
      });
    }
   
  }

  validationFechaInicial() {
    const fechaInicio = this.registerClientForm.controls['Fecha_inicio'].value;
    const documento = this.registerClientForm.controls['Fecha_inicio'].value;
    const fechaActual = moment(new Date().toISOString()).format("YYYY-MM-DD").toString();
    const fechaActualMenos = moment(fechaActual).add(-3, 'days').toString();
    var fechaFormat = new Date(fechaActualMenos);
    var fecha_Actual_format = moment(fechaFormat.toISOString()).format("YYYY-MM-DD").toString();

    if (this.fechaInicialAntigua !== fechaInicio) {
      if (fechaInicio < fecha_Actual_format) {
          this._notifAlert.Advertencia('La fecha de inicio , no puede ser menor a 3 dias como maximo de la fecha actual.');
          this.registerClientForm.controls['Fecha_inicio'].reset();
        }
  
      this.setFechaFinal();
    }

    if (this.isEdit) {
      if (this.fechaInicialAntigua !== fechaInicio) {
        this.editaFechaInicial = true;
        this.openSeguridad.nativeElement.click();
      }
    }

  }

  validarCambioDocumento() {
    const fechaInicio = this.registerClientForm.controls['Documento_identitdad'].value;
    if (this.isEdit) {
      if (this.documentoAntiguo !== fechaInicio) {
        this.editaDocumento = true;
        this.openSeguridad.nativeElement.click();
      }
    }
  }

  consultarClienteCedula(documento: string) {
    this._clientesService.getTClientesByDocument(documento).subscribe(result => {
      console.log(result);
      this.registerClientForm.controls['Nombres'].setValue(result.Nombres);
    })
  }

  guardarCliente() {
    if (!this.registerClientForm.valid) {
      this.loading = false;
      this.registerClientForm.markAllAsTouched();
    } else {
      this.loading = true;
      this.registerClientForm.controls['Id_Usuario'].setValue(String(this.registerClientForm.controls['Id_Usuario'].value));
      this.registerClientForm.controls['Documento_identitdad'].setValue(String(this.registerClientForm.controls['Documento_identitdad'].value));
      this.registerClientForm.controls['Fecha_fin'].setValue(String(this.registerClientForm.controls['Fecha_fin'].value));
      const hora = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
      const hora_format = moment(hora, 'H:m:s').format('h:mm a');
      this.registerClientForm.controls['Hora_Registro'].setValue(hora_format);
      const fecha_Up = new Date;
      var fecha_update_format = moment(fecha_Up.toISOString()).format("YYYY-MM-DD").toString();
      this.registerClientForm.controls['Fecha_Actualizacion'].setValue(fecha_update_format);

      this._clientesService.saveClientes(this.mapperCliente(this.registerClientForm.value)).subscribe(
        result => {
          this.loading = false;
          this._notifAlert.Exitoso('registro');
          this.registerClientForm.reset();
          this.SetFechaRegistro();
        }, error => {
          this.loading = false;
          this._notifAlert.Advertencia(error.error.EntityValidationErrors[0]._validationErrors[0]._errorMessage);
        }
      )
    }
  }

  validarUsuario(id: any) {
    if (id !== 0 && id !== null && id !== undefined) {
      const usuario = this.usuariosData.filter(c => c.Id_Usuario == id);
      if (!usuario[0].Estado) {
        this.loading = false;
        this._notifAlert.Advertencia('El usuario se encuentra desactivado, no puede realizar ventas con este usuario.');
        this.registerClientForm.controls['Id_Usuario'].reset();
      }

    }
  }

  editarCliente() {
    if (!this.registerClientForm.valid) {
      this.registerClientForm.markAllAsTouched();
    } else {
      const fechaNewInicial = this.registerClientForm.controls['Fecha_inicio'].value;
      if (this.fechaInicialAntigua !== fechaNewInicial) {
        this._notifAlert.confirmationNotBtnCancel('¿ Que deseas hacer ?', '', 'NUEVO PAGO').then(reingreso => {
          if (reingreso) {
            this.EditClientPrivate(reingreso);
          }
        })
      } else {
        this._notifAlert.confirmationNotBtnConfirm('¿ Que deseas hacer ?', '', 'EDITAR USUARIO').then(reingreso => {
          if (reingreso) {
            reingreso = false;
            this.EditClientPrivate(reingreso);
          }
        })
      }
      // var algo = this._clienteMapService.mapperClienteForm(this.registerClientForm.value);
    }
  }

  private EditClientPrivate(reingreso: boolean) {

    // if (this.fechaInicialAntigua === this.registerClientForm.value.Fecha_inicio) {
    //   this._notifAlert.Advertencia('Debe seleccionar una nueva fecha de incio.');
    // } else {
      this.loading = true;
      this.registerClientForm.controls['Estado'].setValue(Number(this.registerClientForm.controls['Estado'].value));
      this.registerClientForm.controls['Id_Plan'].setValue(Number(this.registerClientForm.controls['Id_Plan'].value));
      this.registerClientForm.controls['Id_Forma_pago'].setValue(Number(this.registerClientForm.controls['Id_Forma_pago'].value));
      this.registerClientForm.controls['Documento_identitdad'].setValue(String(this.registerClientForm.controls['Documento_identitdad'].value));
      this.registerClientForm.controls['Id_Usuario'].setValue(this.registerClientForm.controls['Id_Usuario'].value);
      this.registerClientForm.controls['Reingreso'].setValue(reingreso);
      const fecha_Up = new Date;
      var fecha_update_format = moment(fecha_Up.toISOString()).format("YYYY-MM-DD").toString();
      this.registerClientForm.controls['Fecha_Actualizacion'].setValue(fecha_update_format);

      this._clientesService.editClients(this.registerClientForm.value, this.registerClientForm.controls['Fecha_fin'].value).subscribe(
        result => {
          this.logUsuario = new LogUsuarioModel;
          this.logUsuario.Accion = (reingreso) ? 'Reingreso cliente': 'Editar cliente';
          this.logUsuario.Fecha_registro = this.registerClientForm.controls['Fecha_Actualizacion'].value;
          this.logUsuario.Id_Usuario = this.registerClientForm.controls['Id_Usuario'].value;
          this.logUsuario.info_data = JSON.stringify(this.registerClientForm.value);
          this._usuariosService.guardarLogUsuario(this.logUsuario).subscribe();
          this.loading = false;
          this.updateAvalible = false;
          this.disabledFechaInicio = false;
          this._notifAlert.ExitosoActualizar('registro');
          this.registerClientForm.reset();
          this.editaDocumento = false;
          this.editaFechaInicial = false;
          setTimeout(() => { this._router.navigateByUrl('/clientes/consultarclientes'); }, 2000);
          
         
        }, error => {
          this.loading = false;
          console.log(error);
          this._notifAlert.Advertencia(error.error.Message);
        }
      );
    // }
  }

  cancelRegisterCliente() {
    this.updateAvalible = false;
    this.disabledFechaInicio = false;
    this.registerClientForm.reset();
    this.habilitarModal = true;
    this.fechaInicial = new Date();
    this.SetFechaRegistro();
  }

  setFechaFinal() {
    this.planData.filter(c => c.Id_Plan === +this.registerClientForm.controls['Id_Plan'].value).map(data => this.planSelect = data);
    const fechaInicio = this.registerClientForm.controls['Fecha_inicio'].value;

    const fechaActual = moment(new Date().toISOString()).format("YYYY-MM-DD").toString();
    const fechaActualMenos = moment(fechaActual).add(-3, 'days').toString();
    var fechaFormat = new Date(fechaActualMenos);
    var fecha_Actual_format = moment(fechaFormat.toISOString()).format("YYYY-MM-DD").toString();

    // if (fechaInicio < fecha_Actual_format) {
    //   this._notifAlert.Advertencia('La fecha de inicio , no puede ser menor a 3 dias como maximo de la fecha actual.');
    //   this.registerClientForm.controls.Fecha_inicio.reset();
    // } else {
      //let plan = this.planData.find(c => c.Id_Plan === this.registerClientForm.controls.Id_Plan.value)?.Id_Plan;
      if (this.planSelect !== undefined) {
        switch (this.planSelect.Id_Plan) {
          case 1: //Mensualidad
            var fechaFinal = moment(this.registerClientForm.controls['Fecha_inicio'].value).add(29, 'days').toString();
            var fechaFinalFormat = new Date(fechaFinal);
            var fecha_fin_format = moment(fechaFinalFormat.toISOString()).format("YYYY-MM-DD").toString();
            this.registerClientForm.controls['Fecha_fin'].setValue(fecha_fin_format);
            break;
          case 2: //Tiquetera
            var fechaFinal = moment(this.registerClientForm.controls['Fecha_inicio'].value).add(29, 'days').toString();
            var fechaFinalFormat = new Date(fechaFinal);
            var fecha_fin_format = moment(fechaFinalFormat.toISOString()).format("YYYY-MM-DD").toString();
            this.registerClientForm.controls['Fecha_fin'].setValue(fecha_fin_format);
            break;
          case 3: //Bimestral
            var fechaFinal = moment(this.registerClientForm.controls['Fecha_inicio'].value).add(2, 'months').toString();
            var fechaFinalFormat = new Date(fechaFinal);
            var fecha_fin_format = moment(fechaFinalFormat.toISOString()).format("YYYY-MM-DD").toString();
            this.registerClientForm.controls['Fecha_fin'].setValue(fecha_fin_format);
            break;
          case 4: //Trimestral
            var fechaFinal = moment(this.registerClientForm.controls['Fecha_inicio'].value).add(3, 'months').toString();
            var fechaFinalFormat = new Date(fechaFinal);
            var fecha_fin_format = moment(fechaFinalFormat.toISOString()).format("YYYY-MM-DD").toString();
            this.registerClientForm.controls['Fecha_fin'].setValue(fecha_fin_format);
            break;
          case 5: //Semestral
            var fechaFinal = moment(this.registerClientForm.controls['Fecha_inicio'].value).add(6, 'months').toString();
            var fechaFinalFormat = new Date(fechaFinal);
            var fecha_fin_format = moment(fechaFinalFormat.toISOString()).format("YYYY-MM-DD").toString();
            this.registerClientForm.controls['Fecha_fin'].setValue(fecha_fin_format);
            break;
          case 6: //Anual
            var fechaFinal = moment(this.registerClientForm.controls['Fecha_inicio'].value).add(11, 'months').toString();
            var fechaFinalFormat = new Date(fechaFinal);
            var fecha_fin_format = moment(fechaFinalFormat.toISOString()).format("YYYY-MM-DD").toString();
            this.registerClientForm.controls['Fecha_fin'].setValue(fecha_fin_format);
            break;
          default:
            var fechaFinal = moment(this.registerClientForm.controls['Fecha_inicio'].value).add(this.planSelect.Cantidad_Dias - 1, 'days').toString();
            var fechaFinalFormat = new Date(fechaFinal);
            var fecha_fin_format = moment(fechaFinalFormat.toISOString()).format("YYYY-MM-DD").toString();
            this.registerClientForm.controls['Fecha_fin'].setValue(fecha_fin_format);
            break;
        }
      } else {
        this._notifAlert.Advertencia('debe seleccionar un plan.');
      }
    // }
  }

  MapperFormCliente(clienteModel: Clientes_Completo) {
    if (clienteModel) {
      this.registerClientForm.get('Id_Cliente')?.setValue(clienteModel.cliente.Id_Cliente);
      this.registerClientForm.get('Nombres')?.setValue(clienteModel.cliente.Nombres);
      this.registerClientForm.get('Apellidos')?.setValue(clienteModel.cliente.Apellidos);
      this.registerClientForm.get('Fecha_nacimiento')?.setValue(moment(clienteModel.cliente.Fecha_nacimiento.toString()).format("YYYY-MM-DD").toString());
      this.registerClientForm.get('Documento_identitdad')?.setValue(clienteModel.cliente.Documento_identitdad);
      this.registerClientForm.get('Celular')?.setValue(clienteModel.cliente.Celular);
      this.registerClientForm.get('Id_Plan')?.setValue(clienteModel.plan.Id_Plan);
      this.registerClientForm.get('Id_Forma_pago')?.setValue(clienteModel.forma_pago.Id_Forma_Pago);
      this.registerClientForm.get('Estado')?.setValue(clienteModel.cliente.Estado == false ? '0' : '1');
      this.registerClientForm.get('Fecha_registro')?.setValue(moment(clienteModel.cliente.Fecha_registro.toString()).format("YYYY-MM-DD").toString());
      this.registerClientForm.get('Id_Usuario')?.setValue(clienteModel.usuario.Id_Usuario);
      this.registerClientForm.get('Fecha_inicio')?.setValue(moment(clienteModel.cliente.Fecha_inicio.toString()).format("YYYY-MM-DD").toString());
      this.registerClientForm.get('Fecha_fin')?.setValue(moment(clienteModel.cliente.Fecha_fin.toString()).format("YYYY-MM-DD").toString());

      this.fechaInicialAntigua = this.registerClientForm.get('Fecha_inicio')?.value;
      this.documentoAntiguo = this.registerClientForm.get('Documento_identitdad')?.value;

      if (clienteModel.Vencido && clienteModel.porVencer) {
        this.disabledFechaInicio = false;
      } 
      else {
        this.disabledFechaInicio = true;
      }

      this.updateAvalible = true;
      this.disabledInputs();
      this.loading = false;
    } else {
      this.loading = false;
    }
  }

  private disabledInputs() {
    // this.registerClientForm.get('Documento_identitdad')?.dirty;
    // this.registerClientForm.get('Documento_identitdad')?.touched;
    // this.registerClientForm.get('Documento_identitdad')?.pristine;
    // this.registerClientForm.get('Documento_identitdad')?.disable();

    // if (this.disabledFechaInicio) {
    //   this.registerClientForm.get('Fecha_inicio')?.dirty;
    //   this.registerClientForm.get('Fecha_inicio')?.touched;
    //   this.registerClientForm.get('Fecha_inicio')?.pristine;
    //   this.registerClientForm.get('Fecha_inicio')?.disable();
    // }
    this.registerClientForm.get('Fecha_registro')?.disable();
  }

  validarSeleccion(input: string, name_input: string) {
    if (this.registerClientForm.controls[input].value === '-1') {
      this._notifAlert.Advertencia('Debe seleccionar una opcion valida');
      this.registerClientForm.controls[input].reset();
    }
    if (name_input === 'plan') {
      this.planData.filter(c => c.Id_Plan == this.registerClientForm.controls[input].value).map(
        result => {
          this.value_plan_seleccionado = result;
          this.setFechaFinal();
        }
      );

    } else if (name_input === 'forma') {
      this.formasData.filter(c => c.Id_Forma_Pago == this.registerClientForm.controls[input].value).map(
        result => this.value_forma_seleccionado = result
      );
    }

    else if (name_input === 'forma') {
      this.formasData.filter(c => c.Id_Forma_Pago == this.registerClientForm.controls[input].value).map(
        result => this.value_forma_seleccionado = result
      );
    }


  }

  private mapperCliente(cliente: any): Clientes {
    return {
      Nombres: cliente.Nombres,
      Apellidos: cliente.Apellidos,
      Celular: cliente.Celular,
      Documento_identitdad: cliente.Documento_identitdad,
      Estado: cliente.Estado === 1 ? true : false,
      Fecha_nacimiento: cliente.Fecha_nacimiento,
      Id_Plan: cliente.Id_Plan,
      Id_Forma_pago: cliente.Id_Forma_pago,
      Id_Cliente: cliente.Id_Cliente,
      Id_Usuario: cliente.Id_Usuario,
      Fecha_fin: cliente.Fecha_fin,
      Fecha_inicio: cliente.Fecha_inicio,
      Fecha_registro: cliente.Fecha_registro,
      Fecha_Actualizacion: cliente.Fecha_Actualizacion,
      Hora_Registro: cliente.Hora_Registro
    }
  }

  validarIdentidad() {
    if (this.seguridadForm.valid) {
      const pass = this.seguridadForm.controls['password'].value;
      this._usuariosService.getUsuarios().subscribe(
        result => {
          this.usuarios = result;
          const identidad = this.usuarios.filter(u => u.Password === pass );
          if (identidad.length > 0) {
            this.registerClientForm.controls['Id_Usuario'].setValue(identidad[0].Id_Usuario);
            this.closeModal.nativeElement.click();
          } else {
            if (this.editaFechaInicial) {
              this.seguridadForm.controls['password'].reset();
            } else if( this.editaDocumento){
              this.registerClientForm.controls['Documento_identitdad'].reset();
            }
            this._notifAlert.Advertencia('No cuenta con los permisos o la contraseña es incorrecta');
            
          }
        }
      )
    } else {
      this.seguridadForm.markAllAsTouched();
    }
  }

  closeSeguridad() {
    this.seguridadForm.reset();
    if (this.editaFechaInicial) {
       this.registerClientForm.get('Fecha_inicio')?.reset();
    } else if (this.editaDocumento) {
       this.registerClientForm.get('Documento_identitdad')?.reset();
    }
   
  }

  InicializarFromulario() {
    this.registerClientForm = this._formBuilder.group({
      Id_Cliente: [null],
      Nombres: [null, [Validators.required, Validators.pattern(this._patternsService.patternOnlyStringSpace)]],
      Apellidos: [null, [Validators.required, Validators.pattern(this._patternsService.patternOnlyStringSpace)]],
      Fecha_nacimiento: [null],
      Documento_identitdad: [null, [Validators.pattern(this._patternsService.patternOnlyNumberFive)]],
      Celular: [null, [Validators.pattern(this._patternsService.patternOnlyNumberFive)]],
      Id_Plan: [null, [Validators.required]],
      Id_Forma_pago: [null, [Validators.required]],
      Estado: [null, [Validators.required]],
      Fecha_registro: [this.fechaInicial, [Validators.required]],
      Id_Usuario: [null, [Validators.required]],
      Fecha_inicio: [null, [Validators.required]],
      Fecha_fin: [null, [Validators.required]],
      Reingreso: [null],
      Fecha_Actualizacion: [null],
      Hora_Registro: [null]
    });

  }

  initialiceFormSeguridad() {
    this.seguridadForm = this._formBuilder.group({
      password: [null, [Validators.required]],

    });

  }
}


