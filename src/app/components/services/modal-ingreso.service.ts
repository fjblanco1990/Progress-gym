import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario_Model } from 'src/app/Maestros/components/usuairos/class/Usuarios.class';
import { HttpServiceService } from 'src/app/services/Config/http-service.service';
import { environment } from 'src/environments/environment';
import { PlanModel } from '../class/planes.class';

@Injectable({
  providedIn: 'root'
})
export class ModalIngresoService {

  private headers!: HttpHeaders;

  constructor(private http: HttpClient, private httpSerivice: HttpServiceService ) { }

  getPlanes(): Observable<PlanModel[]> {
    return this.httpSerivice.get<PlanModel[]>(`${environment.apiUrl}GetPlanes`);
  }

  getUsuarios(): Observable<Usuario_Model[]> {
    return this.httpSerivice.get<Usuario_Model[]>(`${environment.apiUrl}GetUsuarios`);
  }

}
