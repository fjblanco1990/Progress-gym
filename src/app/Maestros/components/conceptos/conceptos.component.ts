import { Component, OnInit } from '@angular/core';
import { ConceptoService } from '../../services/conceptos.service';
import { ConceptoModel } from '../../../components/class/conceptos.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacionesService } from '../../../services/Config/seewtAlert.service';

@Component({
  selector: 'app-conceptos',
  templateUrl: './conceptos.component.html',
  styleUrls: ['./conceptos.component.scss'],
  providers:[NotificacionesService]
})
export class ConceptosComponent implements OnInit {
  conceptosForm!: FormGroup;
  habilitarModal: boolean = true;
  con: number = 1;
  conceptosData: ConceptoModel[] = [];
  showBtnEdit: boolean = false;
  showBtnSave: boolean = true;
  constructor(private _conceptoService: ConceptoService, private _build: FormBuilder, private _notiService: NotificacionesService) { }

  ngOnInit(): void {
    this.getConceptos();
    this.initializarFormulario();
  }

  desactiveRegistroIngreso() {
    this.habilitarModal = false;
  }

  habilitarRegistroIngreso() {
    this.habilitarModal = true;
  }

  getConceptos() {
    this._conceptoService.getConceptos().subscribe( result => this.conceptosData =  result);
  }

  mapConceptos(concepto: ConceptoModel) {
      this.showBtnEdit = true;
      this.showBtnSave = false;
      this.conceptosForm.get('Id_Concepto')?.setValue(concepto.Id_Concepto);
      this.conceptosForm.get('Descripcion')?.setValue(concepto.Descripcion);
      this.conceptosForm.get('valor_concepto')?.setValue(concepto.valor_concepto);
  }

  cancelar() {
    this.showBtnEdit = false;
    this.showBtnSave = true;
    this.conceptosForm.reset();
  }

  GuardarConcepto() {
    if (this.conceptosForm.valid) {
      this._conceptoService.guardarConcepto(this.conceptosForm.value).subscribe( result =>  {
        this._notiService.ExitosoGeneral('El registro se guardo con exito.');
        this.conceptosForm.reset();
        this.getConceptos();
        this.showBtnEdit = false;
        this.showBtnSave = true;
      })
    } else {
      this.conceptosForm.markAllAsTouched();
    }
    
  }

  EditarConcepto() {
    this._conceptoService.editCconcepto(this.conceptosForm.value).subscribe( result => {
      if (result) {
        this._notiService.ExitosoGeneral('El registro se actualizo con exito.');
        this.conceptosForm.reset();
        this.showBtnEdit = false;
        this.showBtnSave = true;
        this.getConceptos();
      }
    })
  }

  EliminarConcepto(idConcepto: number) {
    this._notiService.confirmation('¿ Seguro, desea eliminar el concepto ?','ELIMINAR', 'CANCELAR').then( reingreso => {
      if (reingreso) {
        this._conceptoService.eliminarConcepto(idConcepto).subscribe( result => {
            if (result) {
              this._notiService.ExitosoGeneral('El registro se elimino con exito.');
              this.getConceptos();
            }
        })
      } 
    })
  }

  initializarFormulario() {
    this.conceptosForm = this._build.group( {
      Id_Concepto: [null],
      Descripcion: [null, [Validators.required]],
      valor_concepto:[null,[Validators.required]]
    })
  }
}
