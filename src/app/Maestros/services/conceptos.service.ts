import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConceptoModel } from 'src/app/components/class/conceptos.class';
import { PlanModel } from 'src/app/components/class/planes.class';
import { HttpServiceService } from 'src/app/services/Config/http-service.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConceptoService {

  private headers!: HttpHeaders;

  constructor(private http: HttpClient, private httpSerivice: HttpServiceService ) { }

  getConceptos(): Observable<ConceptoModel[]> {
    return this.httpSerivice.get<ConceptoModel[]>(`${environment.apiUrl}getConceptos`);
  }

}