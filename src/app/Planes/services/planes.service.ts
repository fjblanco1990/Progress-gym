import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/services/Config/http-service.service';
import { environment } from 'src/environments/environment';
import { PlanModel } from '../class/planes.class';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  private headers!: HttpHeaders;

  constructor(private http: HttpClient, private httpSerivice: HttpServiceService ) { }

  getPlanes(): Observable<PlanModel[]> {
    return this.httpSerivice.get<PlanModel[]>(`${environment.apiUrl}GetPlanes`);
  }


}
