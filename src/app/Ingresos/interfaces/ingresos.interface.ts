import { Clientes } from "src/app/Clientes/interfaces/clientes.interfaces";

export class Ingreso  {
    Id_Ingreso!: number;
    Id_Cliente!: number;
    Fecha_Ingreso!: Date;
    Hora_Ingreso!: string;
}


export class Ingreso_completo  {
    cliente!: Clientes;
    ingreso!: Ingreso;
}