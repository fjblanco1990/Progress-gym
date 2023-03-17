import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaestrosRoutingModule } from './maestros-routing.module';
import { MaestrosDashComponent } from './pages/maestros-dash/maestros-dash.component';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MaestrosDashComponent
  ],
  imports: [
    CommonModule,
    MaestrosRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class MaestrosModule { }
