import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { map, tap } from 'rxjs/operators';
import { PatternsService } from 'src/app/services/Config/patterns.service';
import { NotificacionesService } from 'src/app/services/Config/seewtAlert.service';
import { ClientesService } from '../../services/clientes.service';
import { PlanesService } from '../../../Planes/services/planes.service';
import { FormaPagoService } from '../../../Formas-pago/services/forma-pago.service';
import { Forma_PagoModel } from 'src/app/Formas-pago/class/forma-pago.class';
import { PlanModel } from 'src/app/Planes/class/planes.class';
import { SendDataComponentsService } from '../../services/send-data-componentes.service';
import { Clientes, Clientes_Completo } from '../../interfaces/clientes.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteMapService } from '../../../services/Mapper/cliente.map.service'
import { Ingreso } from '../../../Ingresos/interfaces/ingresos.interface';
import { Subscription } from 'rxjs/internal/Subscription';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
  providers: [ClientesService, PatternsService, NotificacionesService]
})

export class RegistrarComponent implements OnInit  {
  @ViewChild('openGetdocumento') openDocumentoModal!: any;

  documentoString: string = '';
  documentoInput: string = '';
  openModal = true;
  registerClientForm!: FormGroup;
  habilitarModal: boolean = true;
  updateAvalible: boolean | '';
  fechaInicial: Date = new Date();
  planData: PlanModel[] = [];
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
  constructor(private _formBuilder: FormBuilder,
    private _clientesService: ClientesService,
    private _patternsService: PatternsService,
    private _notifAlert: NotificacionesService,
    private _planesService: PlanesService,
    private _formaPagoService: FormaPagoService,
    private _sendDataComponentsService: SendDataComponentsService,
    private _router: Router,
    private _Activatedroute: ActivatedRoute
  ) {
    this.updateAvalible = false;
  }

  ngOnInit(): void {

    this.InicializarFromulario();
    this.registerClientForm.reset();
    // this.registerClientForm.get('Fecha_fin')?.disable();
    this.getPlanes();
    this.getFormasPago();
    this.registerClientForm.controls.Estado.setValue("-1");
    const edit = this._Activatedroute.snapshot.paramMap.get("edit");
    if ( edit === '1') {
        this.isEdit = true;
        this.subcription = this._sendDataComponentsService.clientDataObservable.subscribe(
          clienteModel => {
            this.MapperFormCliente(clienteModel);
          }
        );
    } else {
      this.isEdit = false;
    }
    

  }

  getPlanes() {
    this._planesService.getPlanes().subscribe(result => this.planData = result);
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
      this._clientesService.validDocumentCliente(this.registerClientForm.controls.Documento_identitdad.value).subscribe(result => {
        if (result >= 1) {
          this._notifAlert.Advertencia('El numero de documento ingresado ya se encuentra registrado.');
          this.registerClientForm.controls.Documento_identitdad.reset();
        }
      });
    }
  }

  consultarClientes() {

  }

  consultarClienteCedula(documento: string) {
    this._clientesService.getTClientesByDocument(documento).subscribe(result => {
      console.log(result);
      this.registerClientForm.controls['Nombres'].setValue(result.Nombres);
    })
  }

  guardarCliente() {
    // this.registerClientForm.controls.Id_Plan.value !== null ? this.registerClientForm.controls.Id_Plan.setValue(this.registerClientForm.controls.Id_Plan.value.Id_Plan): 0;
    // this.registerClientForm.controls.Id_Forma_pago.value !== null ? this.registerClientForm.controls.Id_Forma_pago.setValue(this.registerClientForm.controls.Id_Forma_pago.value.Id_Forma_Pago): 0;
    this.registerClientForm.controls.Id_Usuario.setValue(1);

    if (!this.registerClientForm.valid) {
      this.registerClientForm.markAllAsTouched();
    } else {
      
          this.registerClientForm.controls.Documento_identitdad.setValue(String(this.registerClientForm.controls.Documento_identitdad.value));
          this.registerClientForm.controls.Fecha_fin.setValue(String(this.registerClientForm.controls.Fecha_fin.value));
    
          const fecha_Up = new Date;
          var fecha_update_format = moment(fecha_Up.toISOString()).format("YYYY-MM-DD").toString();
          this.registerClientForm.controls.Fecha_Actualizacion.setValue(fecha_update_format);
    
          this._clientesService.saveClientes(this.mapperCliente(this.registerClientForm.value)).subscribe(
            result => {
              this._notifAlert.Exitoso('registro');
              this.registerClientForm.reset();
            }, error => {
              console.log(error);
    
              this._notifAlert.Advertencia(error.error.EntityValidationErrors[0]._validationErrors[0]._errorMessage);
            }
          )
        
    }
  }

  editarCliente() {
    this.registerClientForm.controls.Id_Usuario.setValue(1);

    if (!this.registerClientForm.valid) {
      this.registerClientForm.markAllAsTouched();
    } else {
      this._notifAlert.confirmation('La actualizacion se realiza para un reingreso ?','SI', 'NO').then( reingreso => {
        if (reingreso) {
          this.EditClientPrivate(reingreso);
        } else {
          this.EditClientPrivate(reingreso);
        }
      })
     
      // var algo = this._clienteMapService.mapperClienteForm(this.registerClientForm.value);
    }

    
  }

  private EditClientPrivate(reingreso: boolean) {

    this.registerClientForm.controls.Estado.setValue(Number(this.registerClientForm.controls.Estado.value));
    this.registerClientForm.controls.Id_Plan.setValue(Number(this.registerClientForm.controls.Id_Plan.value));
    this.registerClientForm.controls.Id_Forma_pago.setValue(Number(this.registerClientForm.controls.Id_Forma_pago.value));
    this.registerClientForm.controls.Documento_identitdad.setValue(String(this.registerClientForm.controls.Documento_identitdad.value));
    this.registerClientForm.controls.Reingreso.setValue(reingreso);
    const fecha_Up = new Date;
    var fecha_update_format = moment(fecha_Up.toISOString()).format("YYYY-MM-DD").toString();
    this.registerClientForm.controls.Fecha_Actualizacion.setValue(fecha_update_format);
  
    this._clientesService.editClients(this.registerClientForm.value, this.registerClientForm.controls.Fecha_fin.value).subscribe(
      result => {
        this.updateAvalible = false;
        this._notifAlert.ExitosoActualizar('registro');
        this.registerClientForm.reset();
        setTimeout(() => { this._router.navigateByUrl('/clientes/consultarclientes'); }, 2000);
      }, error => {
        console.log(error);

        this._notifAlert.Advertencia(error.error.EntityValidationErrors[0]._validationErrors[0]._errorMessage);
      }
    );
  }

  cancelRegisterCliente() {
    this.updateAvalible = false;
    this.registerClientForm.reset();
    this.habilitarModal = true;
    this.fechaInicial = new Date();
  }

  eliminarCliente(id: number) {

  }

  setFechaFinal() {
    console.log(this.planData);

    this.planData.filter( c => c.Id_Plan === +this.registerClientForm.controls.Id_Plan.value).map( data => this.planSelect = data);
    
    //let plan = this.planData.find(c => c.Id_Plan === this.registerClientForm.controls.Id_Plan.value)?.Id_Plan;
    switch (this.planSelect.Id_Plan) {
      case 1: //Mensualidad
        var fechaInicial = new Date(this.registerClientForm.controls.Fecha_inicio.value);
        var fechaFinal = moment(fechaInicial).add(1, 'months').toString();
        var fechaFinalFormat = new Date(fechaFinal);
        var fecha_fin_format = moment(fechaFinalFormat.toISOString()).format("YYYY-MM-DD").toString();
        this.registerClientForm.controls.Fecha_fin.setValue(fecha_fin_format);
        break;
      case 2: //Tiquetera
        var fechaInicial = new Date(this.registerClientForm.controls.Fecha_inicio.value);
        var fechaFinal = moment(fechaInicial).add(13, 'days').toString();
        var fechaFinalFormat = new Date(fechaFinal);
        var fecha_fin_format = moment(fechaFinalFormat.toISOString()).format("YYYY-MM-DD").toString();
        this.registerClientForm.controls.Fecha_fin.setValue(fecha_fin_format);
        break;
      case 3: //Bimestral
        var fechaInicial = new Date(this.registerClientForm.controls.Fecha_inicio.value);
        var fechaFinal = moment(fechaInicial).add(2, 'months').toString();
        var fechaFinalFormat = new Date(fechaFinal);
        var fecha_fin_format = moment(fechaFinalFormat.toISOString()).format("YYYY-MM-DD").toString();
        this.registerClientForm.controls.Fecha_fin.setValue(fecha_fin_format);
        break;
      case 4: //Trimestral
        var fechaInicial = new Date(this.registerClientForm.controls.Fecha_inicio.value);
        var fechaFinal = moment(fechaInicial).add(3, 'months').toString();
        var fechaFinalFormat = new Date(fechaFinal);
        var fecha_fin_format = moment(fechaFinalFormat.toISOString()).format("YYYY-MM-DD").toString();
        this.registerClientForm.controls.Fecha_fin.setValue(fecha_fin_format);
        break;
      case 5: //Semestral
        var fechaInicial = new Date(this.registerClientForm.controls.Fecha_inicio.value);
        var fechaFinal = moment(fechaInicial).add(6, 'months').toString();
        var fechaFinalFormat = new Date(fechaFinal);
        var fecha_fin_format = moment(fechaFinalFormat.toISOString()).format("YYYY-MM-DD").toString();
        this.registerClientForm.controls.Fecha_fin.setValue(fecha_fin_format);
        break;
      case 6: //Anual
        var fechaInicial = new Date(this.registerClientForm.controls.Fecha_inicio.value);
        var fechaFinal = moment(fechaInicial).add(11, 'months').toString();
        var fechaFinalFormat = new Date(fechaFinal);
        var fecha_fin_format = moment(fechaFinalFormat.toISOString()).format("YYYY-MM-DD").toString();
        this.registerClientForm.controls.Fecha_fin.setValue(fecha_fin_format);
        break;
      default:
        break;
    }

  }

  MapperFormCliente(clienteModel: Clientes_Completo) {
    if (clienteModel) {
      this.registerClientForm.get('Id_Cliente')?.setValue(clienteModel.cliente.Id_Cliente);
      this.registerClientForm.get('Nombres')?.setValue(clienteModel.cliente.Nombres);
      this.registerClientForm.get('Apellidos')?.setValue(clienteModel.cliente.Apellidos);
      this.registerClientForm.get('Fecha_nacimiento')?.setValue(this.formatSetDateInputs(clienteModel.cliente.Fecha_nacimiento.toString()));
      this.registerClientForm.get('Documento_identitdad')?.setValue(clienteModel.cliente.Documento_identitdad);
      this.registerClientForm.get('Celular')?.setValue(clienteModel.cliente.Celular);
      this.registerClientForm.get('Id_Plan')?.setValue(clienteModel.plan.Id_Plan);
      this.registerClientForm.get('Id_Forma_pago')?.setValue(clienteModel.forma_pago.Id_Forma_Pago);
      this.registerClientForm.get('Estado')?.setValue(clienteModel.cliente.Estado == false ? '0': '1');
      this.registerClientForm.get('Fecha_registro')?.setValue(this.formatSetDateInputs(clienteModel.cliente.Fecha_registro.toString()));
      this.registerClientForm.get('Id_Usuario')?.setValue(clienteModel.cliente.Id_Usuario);
      this.registerClientForm.get('Fecha_inicio')?.setValue(this.formatSetDateInputs(clienteModel.cliente.Fecha_inicio.toString()));
      this.registerClientForm.get('Fecha_fin')?.setValue(this.formatSetDateInputs(clienteModel.cliente.Fecha_fin.toString()));
     
      console.log(this.registerClientForm.value);
      this.updateAvalible = true;
      this.disabledInputs();
    }
  }

  private disabledInputs() {
    this.registerClientForm.get('Documento_identitdad')?.dirty;
    this.registerClientForm.get('Documento_identitdad')?.touched;
    this.registerClientForm.get('Documento_identitdad')?.pristine;

    this.registerClientForm.get('Fecha_registro')?.disable();
    this.registerClientForm.get('Documento_identitdad')?.disable();
  }

  validarSeleccion(input: string, name_input: string) {
    if (this.registerClientForm.controls[input].value === '-1') {
      this._notifAlert.Advertencia('Debe seleccionar una opcion valida');
      this.registerClientForm.controls[input].reset();
    }
    if (name_input === 'plan') {
      this.planData.filter(c => c.Id_Plan == this.registerClientForm.controls[input].value).map(
        result => this.value_plan_seleccionado = result
      );
    } else if (name_input === 'forma') {
      this.formasData.filter(c => c.Id_Forma_Pago == this.registerClientForm.controls[input].value).map(
        result => this.value_forma_seleccionado = result
      );
    }


  }

  private formatSetDateInputs(date: string): string {
    moment(this.registerClientForm.controls.Fecha_inicio.value, 'YYYY-MM-DD')
    var newFecha = new Date(date);
    var fechaMoment = moment(newFecha).toString(); //.add(1, 'months')
    var fechaFormat = new Date(fechaMoment);
    var fechaSetformat = moment(fechaFormat.toISOString()).format("YYYY-MM-DD").toString();
    return fechaSetformat;
  }

  private mapperCliente(cliente: any): Clientes {
    return {
       Nombres: cliente.Nombres,
       Apellidos: cliente.Apellidos,
       Celular: cliente.Celular,
       Documento_identitdad: cliente.Documento_identitdad,
       Estado: cliente.Estado === '1' ? true : false,
       Fecha_nacimiento: cliente.Fecha_nacimiento,
       Id_Plan: cliente.Id_Plan,
       Id_Forma_pago: cliente.Id_Forma_pago,
       Id_Cliente: cliente.Id_Cliente,
       Id_Usuario: cliente.Id_Usuario,
       Fecha_fin: cliente.Fecha_fin,
       Fecha_inicio: cliente.Fecha_inicio,
       Fecha_registro: cliente.Fecha_registro,
       Fecha_Actualizacion: cliente.Fecha_Actualizacion
    }
  }

  InicializarFromulario() {
    this.registerClientForm = this._formBuilder.group({
      Id_Cliente: [null],
      Nombres: [null, [Validators.required, Validators.pattern(this._patternsService.patternOnlyStringSpace)]],
      Apellidos: [null, [Validators.required, Validators.pattern(this._patternsService.patternOnlyStringSpace)]],
      Fecha_nacimiento: [null, [Validators.required]],
      Documento_identitdad: [null, [Validators.pattern(this._patternsService.patternOnlyNumberFive)]],
      Celular: [null, [Validators.required, Validators.pattern(this._patternsService.patternOnlyNumberFive)]],
      Id_Plan: [null, [Validators.required]],
      Id_Forma_pago: [null, [Validators.required]],
      Estado: [null, [Validators.required]],
      Fecha_registro: [this.fechaInicial, [Validators.required]],
      Id_Usuario: [null, [Validators.required]],
      Fecha_inicio: [null, [Validators.required]],
      Fecha_fin: [null, [Validators.required]],
      Reingreso:[null],
      Fecha_Actualizacion: [null]
    });

  }
}


