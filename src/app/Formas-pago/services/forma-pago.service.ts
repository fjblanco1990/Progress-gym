import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/services/Config/http-service.service';
import { environment } from 'src/environments/environment';
import { Forma_PagoModel } from '../class/forma-pago.class';

@Injectable({
  providedIn: 'root'
})
export class FormaPagoService {

  private headers!: HttpHeaders;

  constructor(private http: HttpClient, private httpSerivice: HttpServiceService ) { }

  getFormasPago(): Observable<Forma_PagoModel[]> {
    return this.httpSerivice.get<Forma_PagoModel[]>(`${environment.apiUrl}GetFormasPago`);
  }

 
}
