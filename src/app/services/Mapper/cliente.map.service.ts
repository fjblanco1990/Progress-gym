import { Injectable } from '@angular/core';
import { Clientes, Clientes_Completo } from '../../Clientes/interfaces/clientes.interfaces';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ClienteMapService {

  constructor() { }

  public mapperClienteCompleto(cliente: Clientes_Completo): Clientes_Completo {
    return {
       cliente: cliente.cliente,
       forma_pago:  cliente.forma_pago,
       usuario: cliente.usuario,
       DiasFaltantes: cliente.DiasFaltantes,
       plan: cliente.plan,
       porVencer: cliente.porVencer,
       Vencido: cliente.Vencido
    }
  }

  public mapperCliente(cliente: Clientes_Completo): Clientes {
    return {
       Nombres: cliente.cliente.Nombres,
       Apellidos: cliente.cliente.Apellidos,
       Celular: cliente.cliente.Celular,
       Documento_identitdad: cliente.cliente.Documento_identitdad,
       Estado: cliente.cliente.Estado,
       Fecha_nacimiento: cliente.cliente.Fecha_nacimiento,
       Id_Plan: cliente.cliente.Id_Plan,
       Id_Forma_pago: cliente.cliente.Id_Forma_pago,
       Id_Cliente: cliente.cliente.Id_Cliente,
       Id_Usuario: cliente.cliente.Id_Usuario,
       Fecha_fin: cliente.cliente.Fecha_fin,
       Fecha_inicio: cliente.cliente.Fecha_inicio,
       Fecha_registro: cliente.cliente.Fecha_registro,
       Fecha_Actualizacion: cliente.cliente.Fecha_Actualizacion

    }
  }

  public mapperClienteForm(cliente: FormGroup): Clientes {
    return {
       Nombres: cliente.controls.Nombres.value,
       Apellidos: cliente.controls.Apellidos.value,
       Celular: cliente.controls.Celular.value,
       Documento_identitdad: cliente.controls.Documento_identitdad.value,
       Estado: cliente.controls.Estado.value,
       Fecha_nacimiento: cliente.controls.Fecha_nacimiento.value,
       Id_Plan: cliente.controls.Id_Plan.value,
       Id_Forma_pago: cliente.controls.Id_Forma_pago.value,
       Id_Cliente: cliente.controls.Id_Cliente.value,
       Id_Usuario: cliente.controls.Id_Usuario.value,
       Fecha_fin: cliente.controls.Fecha_fin.value,
       Fecha_inicio: cliente.controls.Fecha_inicio.value,
       Fecha_registro: cliente.controls.Fecha_registro.value,
       Fecha_Actualizacion: cliente.controls.Fecha_Actualizacion.value

    }
  }

}
