import { Usuario_Model } from '../../Maestros/components/usuairos/class/Usuarios.class';
import { Clientes } from '../../Clientes/interfaces/clientes.interfaces';

export class Deudas_Model {
    Id_Deuda!: number;
    Id_Usuario!: number;
    Id_Cliente!: number;
    Fecha_deuda!: string;
    Hora_deuda!: string;
    descripcion!: string;
    Valor_deuda!: number;
}

export class Deudas_Model_Completo {
    deuda!: Deudas_Model;
    usuario!: Usuario_Model;
    cliente!: Clientes;
}