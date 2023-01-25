import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoreRoutingModule } from './proveedore-routing.module';
import { ProveedorDashComponent } from './page/proveedor-dash/proveedor-dash.component';


@NgModule({
  declarations: [
    ProveedorDashComponent
  ],
  imports: [
    CommonModule,
    ProveedoreRoutingModule
  ]
})
export class ProveedoreModule { }
