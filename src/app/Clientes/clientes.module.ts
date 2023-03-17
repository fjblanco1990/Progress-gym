import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ClientesRoutingModule } from './clientes-routing.module';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { ConsultarComponent } from './pages/consultar/consultar.component';
import { SharedModule } from "../shared/shared.module";
import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { LoadingModule } from 'ngx-loading';


@NgModule({
    declarations: [
        RegistrarComponent,
        ConsultarComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ClientesRoutingModule,
        SharedModule,
        ComponentsModule,
        NgxTablePaginationModule,
        LoadingModule
    ],
    exports: [
        RegistrarComponent,
        ConsultarComponent
        
    ],
})
export class ClientesModule { }
