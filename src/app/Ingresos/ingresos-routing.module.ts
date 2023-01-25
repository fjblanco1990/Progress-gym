import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarIngresosComponent } from './pages/registrar-ingresos/registrar-ingresos.component';
import { ConsultarIngresosComponent } from './pages/consultar-ingresos/consultar-ingresos.component';

const routes: Routes = [
  {
    path: '',
    children: [
       { path:'Informes', component: RegistrarIngresosComponent },
       { path:'consultar-ingreso', component: ConsultarIngresosComponent },
       { path: '**', redirectTo: 'registro-ingreso'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class IngresosRoutingModule { }
