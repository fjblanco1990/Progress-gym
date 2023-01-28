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

  constructor(private http: HttpClient, private httpSerivice: HttpServiceService ) { }

  getPlanes(): Observable<PlanModel[]> {
    return this.httpSerivice.get<PlanModel[]>(`${environment.apiUrl}GetPlanes`);
  }

}
