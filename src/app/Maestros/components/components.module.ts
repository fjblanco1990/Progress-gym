import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { PlanesComponent } from './planes/planes.component';
import { ConceptosComponent } from './conceptos/conceptos.component';
import { DashComponent } from './dash/dash.component';


@NgModule({
  declarations: [
    PlanesComponent,
    ConceptosComponent,
    DashComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    
  ]
})
export class ComponentsMasterModule { }
