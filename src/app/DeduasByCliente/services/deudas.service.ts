import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/services/Config/http-service.service';
import { environment } from 'src/environments/environment';
import { Deudas_Model_Completo } from '../interfaces/deudas.class';

@Injectable({
  providedIn: 'root'
})
export class DeudasService {

  private headers!: HttpHeaders;

  constructor(private http: HttpClient, private _httpSerivice: HttpServiceService ) { }

  GetAllDeudas(): Observable<Deudas_Model_Completo[]> {
    return this._httpSerivice.get<Deudas_Model_Completo[]>(`${environment.apiUrl}GetAllDeudas`);
  }

  GuardarDeuda(deudasForm: any): Observable<any> {
    return this._httpSerivice.post(`${environment.apiUrl}GuardarDeuda`, JSON.stringify(deudasForm))
  }

  // editarUsuario(userDto: Usuario_Model): Observable<any> {
  //   return this._httpSerivice.post(`${environment.apiUrl}EditarUsuario`, JSON.stringify(userDto))
  // }

  eliminarUsuario(idDeuda: number): Observable<boolean> {
    return this._httpSerivice.get<boolean>(`${environment.apiUrl}EliminarDeuda?idDeuda=${idDeuda}`);
  }

}
