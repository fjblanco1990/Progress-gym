import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanesComponent } from './components/planes.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PlanesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    PlanesComponent
  ]
})
export class PlanesModule { }
