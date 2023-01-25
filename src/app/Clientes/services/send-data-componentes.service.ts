import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";
import { Clientes_Completo } from "../interfaces/clientes.interfaces";


@Injectable({
    providedIn: 'root'
  })

  export class SendDataComponentsService {

    dataCliente!: Clientes_Completo;

      private ClientDataSubject = new BehaviorSubject<Clientes_Completo>(this.dataCliente);
      clientDataObservable = this.ClientDataSubject.asObservable();

  
      sendInformationUCliente(infoComponent: Clientes_Completo) {
          this.dataCliente = infoComponent;
          this.ClientDataSubject.next(infoComponent);
      }
      
  }