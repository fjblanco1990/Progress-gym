import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresosRoutingModule } from './ingresos-routing.module';
import { RegistrarIngresosComponent } from './pages/registrar-ingresos/registrar-ingresos.component';
import { ConsultarIngresosComponent } from './pages/consultar-ingresos/consultar-ingresos.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxTablePaginationModule } from 'ngx-table-pagination';


@NgModule({
    declarations: [
        RegistrarIngresosComponent,
        ConsultarIngresosComponent
    ],
    exports: [
        RegistrarIngresosComponent,
        ConsultarIngresosComponent
    ],
    imports: [
        CommonModule,
        IngresosRoutingModule,
        SharedModule,
        ComponentsModule,
        ReactiveFormsModule,
        NgxTablePaginationModule
    ]
})
export class IngresosModule { }
