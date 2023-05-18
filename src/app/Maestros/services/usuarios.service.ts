import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/services/Config/http-service.service';
import { environment } from 'src/environments/environment';
import { Usuario_Model } from '../components/usuairos/class/Usuarios.class';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private headers!: HttpHeaders;

  constructor(private http: HttpClient, private _httpSerivice: HttpServiceService ) { }

  getUsuarios(): Observable<Usuario_Model[]> {
    return this._httpSerivice.get<Usuario_Model[]>(`${environment.apiUrl}GetUsuarios`);
  }

  guardarUsuarios(usuariosForm: any): Observable<any> {
    return this._httpSerivice.post(`${environment.apiUrl}GuardarUsuarios`, JSON.stringify(usuariosForm))
  }

  editarUsuario(userDto: Usuario_Model): Observable<any> {
    return this._httpSerivice.post(`${environment.apiUrl}EditarUsuario`, JSON.stringify(userDto))
  }

  eliminarUsuario(idUsuario: number): Observable<boolean> {
    return this._httpSerivice.get<boolean>(`${environment.apiUrl}EliminarUsuario?idUsuario=${idUsuario}`);
  }

  guardarLogUsuario(usuariosLog: any): Observable<any> {
    return this._httpSerivice.post(`${environment.apiUrl}GuardarLogUsuario`, JSON.stringify(usuariosLog))
  }

}
