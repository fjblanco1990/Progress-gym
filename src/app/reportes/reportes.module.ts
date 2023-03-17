import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteUsuarioComponent } from './pages/reporte-usuario/reporte-usuario.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { LoadingModule } from 'ngx-loading';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReporteUsuarioComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    SharedModule,
    ComponentsModule,
    NgxTablePaginationModule,
    LoadingModule,
    ReactiveFormsModule
  ]
})
export class ReportesModule { }
