import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanModel } from 'src/app/components/class/planes.class';
import { NotificacionesService } from 'src/app/services/Config/seewtAlert.service';
import { PlanesService } from '../../services/planes.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario_Model } from './class/Usuarios.class';

@Component({
  selector: 'app-usuairos',
  templateUrl: './usuairos.component.html',
  styleUrls: ['./usuairos.component.scss'],
  providers: [NotificacionesService]
})
export class UsuairosComponent implements OnInit {

  UsuariosForm!: FormGroup;
  habilitarModal: boolean = true;
  p: number = 1;
  usuarioData: Usuario_Model[] = [];
  showBtnEdit: boolean = false;
  showBtnSave: boolean = true;
  constructor(private _usuariosService: UsuariosService, private _build: FormBuilder, private _notiService: NotificacionesService) { }

  ngOnInit(): void {
    this.initializarFormulario();
    this.getUsuarios();

  }

  desactiveRegistroIngreso() {
    this.habilitarModal = false;
  }

  habilitarRegistroIngreso() {
    this.habilitarModal = true;
  }

  getUsuarios() {
    this._usuariosService.getUsuarios().subscribe(result => this.usuarioData = result);
  }

  mapUser(user: Usuario_Model) {
    this.showBtnEdit = true;
    this.showBtnSave = false;
    this.UsuariosForm.get('Id_Usuario')?.setValue(user.Id_Usuario);
    this.UsuariosForm.get('Nombre_completo')?.setValue(user.Nombre_completo);
    this.UsuariosForm.get('Estado')?.setValue(user.Estado);
    this.UsuariosForm.get('Nick_Name')?.setValue(user.Nick_Name);
    this.UsuariosForm.get('Password')?.setValue(user.Password);
    this.UsuariosForm.get('Fecha_creacion')?.setValue(user.Fecha_creacion);
  }

  cancelar() {
    this.showBtnEdit = false;
    this.showBtnSave = true;
    this.UsuariosForm.reset();
  }

  GuardarPlan() {
    if (this.UsuariosForm.valid) {
      this.UsuariosForm.controls.Fecha_creacion.setValue(new Date());
       this._usuariosService.guardarUsuarios(this.UsuariosForm.value).subscribe(result => {
      this._notiService.ExitosoGeneral('El registro se guardo con exito.');
      this.UsuariosForm.reset();
      this.getUsuarios();
      this.showBtnEdit = false;
      this.showBtnSave = true;
    })
    } else {
      this.UsuariosForm.markAllAsTouched();
    }
   
  }

  EditarPlan() {
    
    this._usuariosService.editarUsuario(this.UsuariosForm.value).subscribe(result => {
      if (result) {
        this._notiService.ExitosoGeneral('El registro se actualizo con exito.');
        this.UsuariosForm.reset();
        this.showBtnEdit = false;
        this.showBtnSave = true;
        this.getUsuarios();
      }
    })
  }

  EliminarPlan(idUser: number) {
    this._notiService.confirmation('¿ Seguro, desea eliminar el usuario ?', 'ELIMINAR', 'CANCELAR').then(reingreso => {
      if (reingreso) {
        this._usuariosService.eliminarUsuario(idUser).subscribe(result => {
          if (result) {
            this._notiService.ExitosoGeneral('El registro se elimino con exito.');
            this.getUsuarios();
          }
        })
      }
    })
  }

  initializarFormulario() {
    this.UsuariosForm = this._build.group( {
      Id_Usuario: [null],
      Nombre_completo: [null, [Validators.required]],
      Fecha_creacion:[null,  []],
      Estado: [null,  [Validators.required]],
      Nick_Name:[null,  [Validators.required]],
      Password:[null,  [Validators.required]],
    })

 
  }
}
