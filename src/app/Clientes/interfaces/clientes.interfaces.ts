import { PlanModel } from "src/app/components/class/planes.class";
import { Forma_PagoModel } from "src/app/Formas-pago/class/forma-pago.class";
import { Usuario_Model } from "src/app/Maestros/components/usuairos/class/Usuarios.class";



export class Clientes {
    Id_Cliente!: number;
    Nombres!: string;
    Apellidos! : string;
    Fecha_nacimiento!: Date;
    Documento_identitdad! : string;
    Celular! : string;
    Id_Plan!: number;
    Id_Forma_pago!: number;
    Estado!: boolean;
    Fecha_registro!: Date;
    Id_Usuario!: number;
    Fecha_inicio!: Date;
    Fecha_fin!: string;
    Fecha_Actualizacion!: string;
    Hora_Registro!: string;
}


export class Clientes_Completo {
    cliente!: Clientes;
    plan!: PlanModel;
    forma_pago! : Forma_PagoModel;
    usuario!: Usuario_Model;
    porVencer!: boolean;
    Vencido!: boolean;
    DiasFaltantes: number = 0;
    palabra!: string;
}