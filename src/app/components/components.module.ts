import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackBottomComponent } from './back-bottom/back-bottom.component';
import { RouterModule } from '@angular/router';
import { ModalIngresoComponent } from './modal-ingreso/modal-ingreso.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BackBottomComponent,
    ModalIngresoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    BackBottomComponent,
    ModalIngresoComponent
  ]
})
export class ComponentsModule { }
