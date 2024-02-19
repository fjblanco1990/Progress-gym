import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClientesRoutingModule } from './clientes-routing.module';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { ConsultarComponent } from './pages/consultar/consultar.component';
import { SharedModule } from "../shared/shared.module";

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
    declarations: [
        RegistrarComponent,
        ConsultarComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ClientesRoutingModule,
        SharedModule,
        ComponentsModule,
        NgbPaginationModule
        //NgxTablePaginationModule,
        //NgxLoadingModule.forRoot({})
    ],
    exports: [
        RegistrarComponent,
        ConsultarComponent
        
    ],
})
export class ClientesModule { }
