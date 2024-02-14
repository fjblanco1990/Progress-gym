import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Informe_fechas_user } from 'src/app/Ingresos/interfaces/informes.interface';
import { NotificacionesService } from 'src/app/services/Config/seewtAlert.service';
import { ModalIngresoService } from '../../../components/services/modal-ingreso.service';
import { VentasService } from '../../../shared/services/ventas.service';
import { Ventas_usuarios_Model } from '../../interfaces/reporte.interface';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-reporte-usuario',
  templateUrl: './reporte-usuario.component.html',
  styleUrls: ['./reporte-usuario.component.scss']
})
export class ReporteUsuarioComponent implements OnInit {
  habilitarModal: boolean = true;
  p: number  = 0;
  v: number = 0;
  reportesForm!: UntypedFormGroup;
  usuariosData: any[] = [];
  dataReportVenta: any[] = [];
  dataReportPlan: any[] = [];
  totalVentaUsuarioReport: number = 0;
  dataReportLst: any[] = [];
  constructor(
    // private _clientesService: ClientesService,
    private _formBuilder: UntypedFormBuilder, 
    private _modalServices: ModalIngresoService,
    private _ventasServices: VentasService
    // private _patternsService: PatternsService, 
    // private _notifAlert: NotificacionesService,
    // private _sendDataComponentsService: SendDataComponentsService,
    // private _ingresoService: IngresoService,
    // private _modalIngresoService: ModalIngresoService,
    // private _usuariosService: UsuariosService,
    // private _router: Router
  ) { 
    
  }

  ngOnInit(): void {
    this.InicializarFromulario();
    this.getUsuarios();
  }

  getUsuarios() {
    this._modalServices.getUsuarios().subscribe(result => this.usuariosData = result);
  }

  getRepotByUser() {
    this.totalVentaUsuarioReport = 0;
    const dataReportObj = new Ventas_usuarios_Model();
    const data = new Informe_fechas_user();
    data.Fecha_Inicial =  this.reportesForm.controls.fechaConsulta.value;
    data.Fecha_Final =  this.reportesForm.controls.fechaConsulta.value;
    data.idUsuario = this.reportesForm.controls.Id_Usuario.value;
    this._ventasServices.GetReporteByUser(data).pipe(
      tap( ({...resul}) => console.log(resul)),
      map(({...result}) => {
        this.dataReportVenta = result.venta_completa;
        this.dataReportPlan = result.ventas_planes_usuarios;
          result.venta_completa.forEach((element: any) => {
            this.dataReportLst.push(element);
            this.totalVentaUsuarioReport = this.totalVentaUsuarioReport + element.venta.Valor_Venta;
          });
          result.ventas_planes_usuarios.forEach((element: any) => {
            this.dataReportLst.push(element);
            this.totalVentaUsuarioReport = this.totalVentaUsuarioReport + element.Ventas_Cliente.Valor_Venta;
          });
      })
    ).subscribe( data => {


      // dataReportObj.venta_completa = result.venta_completa;
      // dataReportObj.ventas_planes_usuarios = result.ventas_planes_usuarios;

      // this.dataReport.push(dataReportObj);

      // data.venta_completa.forEach((datos: any) => {
      //   this.totalVentaUsuarioReport = this.totalVentaUsuarioReport + datos.venta.Valor_Venta;
      // });
      // data.ventas_planes_usuarios.forEach((planes: any) => {
      //   this.totalVentaUsuarioReport = this.totalVentaUsuarioReport + planes.Ventas_Cliente.Valor_Venta;
      // });

    })
  }
  
  desactiveRegistroIngreso() {
    this.habilitarModal = false;
  }

  habilitarRegistroIngreso() {
    this.habilitarModal = true;
  }

  clear() {
    this.reportesForm.reset();
    this.dataReportPlan = [];
    this.dataReportVenta = [];
  }
  
  InicializarFromulario() {
    this.reportesForm = this._formBuilder.group({
      Id_Usuario: [null, []],
      fechaConsulta: [null, []]
    });
  }

}
