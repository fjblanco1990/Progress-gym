import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Clientes, Clientes_Completo } from '../interfaces/clientes.interfaces';
import { HttpServiceService } from '../../services/Config/http-service.service';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private headers!: HttpHeaders;

  constructor(private http: HttpClient, private httpSerivice: HttpServiceService ) { }

  getClientesAll(): Observable<Clientes_Completo[]> {
    return this.httpSerivice.get<Clientes_Completo[]>(`${environment.apiUrl}ConsultarTodosClientes`);
  }

  getTClientesByDocument(documento: string): Observable<Clientes> {
    return this.http.get<Clientes>(`${environment.apiUrl}ConsultarClienteCedula?documento=${documento}`);
  }

  saveClientes(clientesForm: any):Observable<any> {
    return this.httpSerivice.post(`${environment.apiUrl}GuardarClientes`, JSON.stringify(clientesForm))
  }

  validDocumentCliente(documento: string):Observable<number> {
    return this.httpSerivice.get(`${environment.apiUrl}ValidarDocumentoCliente?documento=${documento}`)
  }

  editClients(clientesDto: Clientes, fecha_fin: string):Observable<any> {
  clientesDto.Fecha_fin = fecha_fin;
    return this.httpSerivice.post(`${environment.apiUrl}EditarClientes`, JSON.stringify(clientesDto))
  }

  EliminarTopesSoat(id: number): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(`${environment.apiUrl}/EliminarCliente/${id}`);
  }

}
