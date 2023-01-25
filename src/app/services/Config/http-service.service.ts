import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private headers!: HttpHeaders;
  constructor(private httpClient: HttpClient, private route: Router) {

    this.setHeader();
  }

  public get<T> (url: string): Observable<T> {
    this.setHeader();
    return this.httpClient.get<T>(url) ;
  }

  public post<T> (url: string, body: string): Observable<T> {
    this.setHeader();
    return this.httpClient.post<T>(url,body, { headers: this.headers }) ;
  }

  public put<T> (url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.httpClient.put<T>(url, {params}) ;
  }

  public delet<T> (url: string, params: HttpParams = new HttpParams()): Observable<T> {
    this.setHeader();
    return this.httpClient.delete<T>(url, {params, headers: this.headers }) ;
  }

  private setHeader() {
      this.headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
  }
}
