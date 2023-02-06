import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { PlanesComponent } from './planes/planes.component';
import { ConceptosComponent } from './conceptos/conceptos.component';
import { DashComponent } from './dash/dash.component';
import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuairosComponent } from './usuairos/usuairos.component';


@NgModule({
  declarations: [
    PlanesComponent,
    ConceptosComponent,
    DashComponent,
    UsuairosComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    NgxTablePaginationModule,
    ComponentsModule,
    ReactiveFormsModule,
    
  ]
})
export class ComponentsMasterModule { }
