import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { fromEvent } from 'rxjs';
import { Ingreso } from 'src/app/Ingresos/interfaces/ingresos.interface';
import { IngresoService } from 'src/app/Ingresos/services/ingreso.service';
import { NotificacionesService } from 'src/app/services/Config/seewtAlert.service';
import { ClientesService } from '../../Clientes/services/clientes.service';
import { PlanModel } from 'src/app/Planes/class/planes.class';
import { PlanesService } from '../../Planes/services/planes.service';

@Component({
  selector: 'app-modal-ingreso',
  templateUrl: './modal-ingreso.component.html',
  styleUrls: ['./modal-ingreso.component.scss'],
  providers: [NotificacionesService]
})
export class ModalIngresoComponent implements OnInit {
  @ViewChild('openGetdocumento') openDocumentoModal!: any;
  @Input() HabilitarRegistroIngreso!: boolean;
  documentoString: string = '';
  documentoInput: string = '';
  openModal: boolean = true;
  showError: boolean = false;
  inside: boolean = false;
  mensajeError: string = '';
  registerForm!: FormGroup;
  planData: PlanModel[] = [];
  constructor(private _formBuilder: FormBuilder, private _clientesService: ClientesService, private _ingresoService: IngresoService,
    private _notifAlert: NotificacionesService, private planService: PlanesService) { }

  ngOnInit(): void {
    this.InicializarFormularios();
    this.RegistarEntradaCliente();
    this.planService.getPlanes().subscribe(p => this.planData = p);

  }

  private RegistarEntradaCliente() {
    this.registerForm.reset();
    const Src2$ = fromEvent<KeyboardEvent>(document, 'keyup');

    Src2$.subscribe(evento => {
      if (this.HabilitarRegistroIngreso) {
        if (!evento.code.includes("NumpadDivide") && !evento.code.includes("NumpadMultiply") && !evento.code.includes("NumpadDecimal")
          && !evento.code.includes("NumpadSubtract") && !evento.code.includes("NumpadAdd")) {
          if (evento.code.includes("Numpad")) {

            if (this.showError) {
              this.documentoInput = this.documentoString;
              this.documentoString = '';
              this.openModal = false;
              this.showError = false;
            }

            if (this.openModal) {
              this.openModal = false;
              this.openDocumentoModal.nativeElement.click();
            }

            if (evento.code === "NumpadEnter" && !this.inside) {
              this.validateRegister();
            }

            if (evento.code !== "NumpadEnter") {
              this.documentoString = this.documentoString + evento.key;
              this.registerForm.controls.documento.setValue(this.documentoString);
            }
          }

          if (evento.code.includes("Backspace")) {
            let backString = this.documentoString.slice(0, -1);
            this.documentoString = backString;
            this.registerForm.controls.documento.setValue(this.documentoString);
          }

          if (evento.code.includes("Escape")) {
            this.documentoString = '';
            this.openModal = true;
          }
        }

        console.log(this.documentoString);
      }
    });
  }

  validateRegister() {
    this.inside = true;
    this._clientesService.getTClientesByDocument(this.registerForm.controls.documento.value).subscribe(
      result => {
        if (result !== null) {
          if (result.Estado !== false) {
            var fechaActual = new Date();
            var fechaFin = new Date(result.Fecha_fin.toString());
  
            this.showError = fechaFin > fechaActual ? false : true;
  
            if (result.Id_Plan === 2) {
              this._ingresoService.getIngreosById(result.Id_Cliente).subscribe(
                resultIngreso => {
                  let plan = this.planData.filter(c => c.Id_Plan == result.Id_Plan).find(c => c.Id_Plan == result.Id_Plan)?.Cantidad_Dias;
                  if (plan) {
                    if (resultIngreso.length >= plan || result.Estado === false) {
                      this.ShowMenssageError(`El usuario uso todos los ingresos de la Tiquetera.`);
                      //aqui cambiar el estado a inactivo para poder 
                      this._ingresoService.editEstadoClients(result,false).subscribe();
                    }
                    else {
                      this.Save();
                    }
                  }
                }
              );
            } else {
              if (!this.showError) {
                this.Save();
              } else {
                this.ShowMenssageError('El usuario se encuentra vencido se debe actualizar la membresia.');
              }
            }
          } else {
            this.ShowMenssageError('El usuario se encuentra inactivo se debe actualizar.');
          }
        } else {
          this.ShowMenssageError('El usuario ingresado aun no se encuentra registrado.');
        }

      }
    )
  }

  private Save() {
    this.documentoInput = this.documentoString;
    this.documentoString = '';
    this.openModal = true;
    this.openDocumentoModal.nativeElement.click();
    this.showError = false;
    this.mensajeError = '';
    //aqui realizar el registro de ingreso
    this.saveRegister(this.documentoInput);
  }

  private ShowMenssageError(mensaje: string) {
    this.documentoInput = this.documentoString;
    this.documentoString = '';
    this.openModal = false;
    this.showError = true;
    this.mensajeError = mensaje;
    this.inside = false;
  }

  private saveRegister(documento: string) {
    this._clientesService.getTClientesByDocument(documento).subscribe(
      result => {
        const ingreso = new Ingreso();
        ingreso.Id_Cliente = result.Id_Cliente;
        ingreso.Fecha_Ingreso = new Date();
        const hora = new Date().getHours().toString() + ':'+ new Date().getMinutes().toString();
        const hora_format = moment(hora,'H:m:s').format('h:mm a');
        ingreso.Hora_Ingreso = hora_format;
        this._ingresoService.saveIngreso(ingreso).subscribe(
          result => {
            this._notifAlert.Exitoso('Ingreso');
            this.inside = false;
          }
        )
      }
    )
  }

  reiniciarModal() {
    this.documentoInput = this.documentoString;
    this.documentoString = '';
    this.openModal = true;
    this.openDocumentoModal.nativeElement.click();
    this.showError = false;
    this.mensajeError = '';
    this.inside = false;
  }

  InicializarFormularios() {
    this.registerForm = this._formBuilder.group({
      documento: [null, [Validators.required]],
    });
  }
}
