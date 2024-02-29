import { Component, OnInit } from '@angular/core';
import { PlanesService } from '../../services/planes.service';
import { PlanModel } from '../../../components/class/planes.class';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NotificacionesService } from '../../../services/Config/seewtAlert.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.scss'],
  providers: [NotificacionesService]
})
export class PlanesComponent implements OnInit {
  PlanesForm!: UntypedFormGroup;
  habilitarModal: boolean = true;
  p: number = 1;
  planesData: PlanModel[] = [];
  showBtnEdit: boolean = false;
  showBtnSave: boolean = true;
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  constructor(private _planService: PlanesService, private _build: UntypedFormBuilder, private _notiService: NotificacionesService) { }

  ngOnInit(): void {
    this.initializarFormulario();
    this.getPlanes();

  }

  desactiveRegistroIngreso() {
    this.habilitarModal = false;
  }

  habilitarRegistroIngreso() {
    this.habilitarModal = true;
  }

  getPlanes() {
    this._planService.getPlanes().subscribe(result => { this.planesData = result; this.collectionSize = this.planesData.length; });
  }

  mapPlan(plan: PlanModel) {
    this.showBtnEdit = true;
    this.showBtnSave = false;
    this.PlanesForm.get('Id_Plan')?.setValue(plan.Id_Plan);
    this.PlanesForm.get('Descripcion')?.setValue(plan.Descripcion);
    this.PlanesForm.get('Valor_Plan')?.setValue(plan.Valor_Plan);
    this.PlanesForm.get('Cantidad_Dias')?.setValue(plan.Cantidad_Dias);
  }

  cancelar() {
    this.showBtnEdit = false;
    this.showBtnSave = true;
    this.PlanesForm.reset();
  }

  GuardarPlan() {
    if (this.PlanesForm.valid) {
       this._planService.guardarPlan(this.PlanesForm.value).subscribe(result => {
      this._notiService.ExitosoGeneral('El registro se guardo con exito.');
      this.PlanesForm.reset();
      this.getPlanes();
      this.showBtnEdit = false;
      this.showBtnSave = true;
    })
    } else {
      this.PlanesForm.markAllAsTouched();
    }
   
  }

  EditarPlan() {
    this._planService.editPlan(this.PlanesForm.value).subscribe(result => {
      if (result) {
        this._notiService.ExitosoGeneral('El registro se actualizo con exito.');
        this.PlanesForm.reset();
        this.showBtnEdit = false;
        this.showBtnSave = true;
        this.getPlanes();
      }
    })
  }

  EliminarPlan(idPlan: number) {
    this._notiService.confirmation('¿ Seguro, desea eliminar el plan ?','', 'ELIMINAR', 'CANCELAR').then(reingreso => {
      if (reingreso) {
        this._planService.eliminarPlan(idPlan).subscribe(result => {
          if (result) {
            this._notiService.ExitosoGeneral('El registro se elimino con exito.');
            this.getPlanes();
          }
        })
      }
    })
  }

  initializarFormulario() {
    this.PlanesForm = this._build.group( {
      Id_Plan: [null],
      Descripcion: [null, [Validators.required]],
      Valor_Plan:[null,  [Validators.required]],
      Cantidad_Dias: [null,  [Validators.required]]
    })
  }

}
