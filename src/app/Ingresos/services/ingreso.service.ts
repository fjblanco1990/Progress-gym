import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clientes } from 'src/app/Clientes/interfaces/clientes.interfaces';
import { HttpServiceService } from 'src/app/services/Config/http-service.service';
import { environment } from 'src/environments/environment';
import { Informe_fechas } from '../interfaces/informes.interface';
import { Ingreso_completo } from '../interfaces/ingresos.interface';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  private headers!: HttpHeaders;

  constructor(private http: HttpClient, private httpSerivice: HttpServiceService ) { }

  getIngresosAll(): Observable<Ingreso_completo[]> {
    return this.httpSerivice.get<Ingreso_completo[]>(`${environment.apiUrl}ConsultarTodosIngresos`);
  }

  getIngreosById(id: number): Observable<Ingreso_completo[]> {
    return this.http.get<Ingreso_completo[]>(`${environment.apiUrl}ConsultarIngresoId?idIngreso=${id}`);
  }

  getIngresosLogAll(): Observable<Ingreso_completo[]> {
    return this.httpSerivice.get<Ingreso_completo[]>(`${environment.apiUrl}ConsultarTodosIngresosLog`);
  }

  getIngreosLogById(id: number): Observable<Ingreso_completo[]> {
    return this.http.get<Ingreso_completo[]>(`${environment.apiUrl}ConsultarIngresoLogId?idIngreso=${id}`);
  }

  saveIngreso(clientesForm: any):Observable<any> {
    return this.httpSerivice.post(`${environment.apiUrl}GuardarIngreso`, JSON.stringify(clientesForm))
  }

  editEstadoClients(clientesDto: Clientes, estado: boolean):Observable<any> {
    clientesDto.Estado = estado;
      return this.httpSerivice.post(`${environment.apiUrl}EditarClientes`, JSON.stringify(clientesDto))
    }
  
    getIngresosDiarios(datesDto: Informe_fechas ): Observable<any> {
      return this.httpSerivice.post(`${environment.apiUrl}GetIngresosDiarios`, JSON.stringify(datesDto)) 
    }

    getVentasDiarias(datesDto: Informe_fechas ): Observable<any> {
      return this.httpSerivice.post(`${environment.apiUrl}GetVentasDiarias`, JSON.stringify(datesDto)) 
    }

    getInformeDiarioGeneral(datesDto: Informe_fechas ): Observable<any> {
      return this.httpSerivice.post(`${environment.apiUrl}GetInformeDiarioGeneral`, JSON.stringify(datesDto)) 
    }
  // EliminarTopesSoat(id: number): Observable<Clientes[]> {
  //   return this.http.get<Clientes[]>(`${environment.apiUrl}/EliminarCliente/${id}`);
  // }
}
