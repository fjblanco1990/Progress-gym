import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Informe_fechas } from 'src/app/Ingresos/interfaces/informes.interface';

import { environment } from 'src/environments/environment';

import { HttpServiceService } from '../../services/Config/http-service.service';


@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private headers!: HttpHeaders;

  constructor(private http: HttpClient, private httpSerivice: HttpServiceService ) { }

  GetVentasAll(): Observable<any> {
    return this.httpSerivice.get<any>(`${environment.apiUrl}GetVentasAll`);
  }

  GetVentasUnicasDiarias(datesDto: Informe_fechas): Observable<any> {
    return this.httpSerivice.post<any>(`${environment.apiUrl}GetVentasUnicasDiarias`, JSON.stringify(datesDto));
  }

  saveVentas(ventasForm: any):Observable<any> {
    return this.httpSerivice.post(`${environment.apiUrl}GuardarVenta`, JSON.stringify(ventasForm))
  }

  getConceptos() {
    return this.httpSerivice.get<any[]>(`${environment.apiUrl}getConceptos`);
  }



}
