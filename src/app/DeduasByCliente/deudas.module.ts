import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeudasRoutingModule } from './deudas-routing.module';
import { DeudasComponent } from './pages/deudas/deudas.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { LoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [
    DeudasComponent
  ],
  imports: [
    CommonModule,
    DeudasRoutingModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgxTablePaginationModule,
    LoadingModule
  ]
})
export class DeudasModule { }
