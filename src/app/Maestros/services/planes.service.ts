import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanModel } from 'src/app/components/class/planes.class';
import { HttpServiceService } from 'src/app/services/Config/http-service.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  private headers!: HttpHeaders;

  constructor(private http: HttpClient, private _httpSerivice: HttpServiceService ) { }

  getPlanes(): Observable<PlanModel[]> {
    return this._httpSerivice.get<PlanModel[]>(`${environment.apiUrl}GetPlanes`);
  }

  guardarPlan(planForm: any): Observable<any> {
    return this._httpSerivice.post(`${environment.apiUrl}GuardarPlan`, JSON.stringify(planForm))
  }

  editPlan(planDto: PlanModel): Observable<any> {
    return this._httpSerivice.post(`${environment.apiUrl}EditarPlan`, JSON.stringify(planDto))
  }

  eliminarPlan(idConcepto: number): Observable<boolean> {
    return this._httpSerivice.get<boolean>(`${environment.apiUrl}EliminarPlan?idPlan=${idConcepto}`);
  }

}
