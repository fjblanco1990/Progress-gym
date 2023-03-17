import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalIngresoService } from 'src/app/components/services/modal-ingreso.service';
import { NotificacionesService } from 'src/app/services/Config/seewtAlert.service';
import { Usuario_Model } from '../../../Maestros/components/usuairos/class/Usuarios.class';
import { ClientesService } from '../../../Clientes/services/clientes.service';
import { Clientes, Clientes_Completo } from 'src/app/Clientes/interfaces/clientes.interfaces';
import { DeudasService } from '../../services/deudas.service';
import * as moment from 'moment';
import { Deudas_Model_Completo } from '../../interfaces/deudas.class';

@Component({
  selector: 'app-deudas',
  templateUrl: './deudas.component.html',
  styleUrls: ['./deudas.component.scss'],
  providers: [NotificacionesService]
})
export class DeudasComponent implements OnInit {

  deudasForm!: FormGroup;
  deudasConsultaForm!: FormGroup;
  habilitarModal: boolean = true;
  usuariosData: Usuario_Model[] = [];
  clientesData: Clientes_Completo[] = [];
  deudasDatas: Deudas_Model_Completo[] = [];
  deudasModelLstSearch: Deudas_Model_Completo[] = [];
  p: number = 1;
  loading: boolean = false;
  totalDeudas = 0;
  constructor(private _formBuilder: FormBuilder, private _modalServices: ModalIngresoService, private _notifAlert: NotificacionesService,
    private _clientesService: ClientesService, private _deudasService: DeudasService) { }

  ngOnInit(): void {
    this.loading = true;
    this.InicializarFromulario();
    this.InicializarFromularioConsulta();
    this.getUsuarios();
    this.getClients();
    this.getDeudas();
    localStorage.setItem('active', '0');
  }

  getDeudas() {
    this.totalDeudas = 0;
    this._deudasService.GetAllDeudas().subscribe(result => {
        this.deudasDatas = result; 
        result.forEach(({...deuda }) => {
          this.totalDeudas = this.totalDeudas + deuda.deuda.Valor_deuda;
        });
        this.deudasModelLstSearch = result;
        this.loading = false; 
      });
  }

  EliminarDeudaByCliente(id: number) {
    this._notifAlert.confirmation('¿ Seguro, desea eliminar la deuda del usuario ?', '', 'ELIMINAR', 'CANCELAR').then(reingreso => {
      if (reingreso) {
        this._deudasService.eliminarUsuario(id).subscribe(result => {
          if (result) {
            this._notifAlert.ExitosoGeneral('El registro se elimino con exito.');
            this.getDeudas();
          }
        })
      }
    })



  }

  getUsuarios() {
    this._modalServices.getUsuarios().subscribe(result => { this.usuariosData = result; this.loading = false; });
  }

  getClients() {
    this._clientesService.getClientesAll().subscribe(result => { this.clientesData = result; this.loading = false; });
  }

  GuardarDeuda() {
    if (this.deudasForm.invalid) {
      this.deudasForm.markAllAsTouched();
    } else {
      this.loading = true;
      var fecha_update_format = moment(new Date).format("YYYY-MM-DD").toString();
      this.deudasForm.controls.Fecha_deuda.setValue(fecha_update_format);
      const hora = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
      const hora_format = moment(hora, 'H:m:s').format('h:mm a');
      this.deudasForm.controls.Hora_deuda.setValue(hora_format);
      this.deudasForm.controls.Id_Cliente.setValue(this.deudasForm.controls.Id_Cliente.value.Id_Cliente);
      this.deudasForm.controls.Id_Usuario.setValue(this.deudasForm.controls.Id_Usuario.value.Id_Usuario);
      this._deudasService.GuardarDeuda(this.deudasForm.value).subscribe(
        result => {
          this.deudasForm.reset();
          this._notifAlert.Exitoso('La deuda se guardo con exito');
          this.loading = false;
          this.getDeudas();
        });
    }
  }

  desactiveRegistroIngreso() {
    this.habilitarModal = false;
  }

  habilitarRegistroIngreso() {
    this.habilitarModal = true;
  }

  filtrarDocumento(documento: string) {
    this.deudasModelLstSearch = this.deudasDatas;
    if (documento)
      this.deudasModelLstSearch = this.deudasModelLstSearch.filter(c => c.cliente.Documento_identitdad.includes(documento));
  }

  filtrarNombre(nombre: string) {
    this.deudasModelLstSearch = this.deudasDatas;
    if (nombre !== '')
      this.deudasModelLstSearch = this.deudasModelLstSearch.filter(c => (c.cliente.Nombres + c.cliente.Apellidos).includes(nombre));

  }

  filtrarUsuario() {
    var usuario = this.deudasConsultaForm.controls.Usuario.value.Id_Usuario;
    this.deudasModelLstSearch = this.deudasDatas;
    if (usuario)
      this.deudasModelLstSearch = this.deudasModelLstSearch.filter(c => c.usuario.Id_Usuario === usuario);
  }

  filterRangoFechas(FechaInit: string) {
    var fechaInicialFormat = moment(FechaInit.toString()).format('YYYY/MM/DD').toString();
    this.deudasModelLstSearch = this.deudasDatas;
    if (FechaInit)
      this.deudasModelLstSearch = this.deudasModelLstSearch.filter(c =>
        moment(c.deuda.Fecha_deuda.toString()).format('YYYY/MM/DD').toString() >= fechaInicialFormat)
  }

  reset() {
    this.deudasModelLstSearch = this.deudasDatas;
    this.deudasConsultaForm.reset();
  }

  InicializarFromulario() {
    this.deudasForm = this._formBuilder.group({
      Id_Deuda: [null],
      Id_Cliente: [null, [Validators.required]],
      Id_Usuario: [null, [Validators.required]],
      Fecha_deuda: [null],
      Hora_deuda: [null, ],
      descripcion: [null, [Validators.required]],
      Valor_deuda: [null, [Validators.required]],
    });
  }

  InicializarFromularioConsulta() {
    this.deudasConsultaForm = this._formBuilder.group({
      Documento: [null],
      Nombre: [null],
      Usuario: [null, [Validators.required]],
      Fecha_deuda: [null, [Validators.required]],
    });
  }

}
