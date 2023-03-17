import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteUsuarioComponent } from './pages/reporte-usuario/reporte-usuario.component';

const routes: Routes = [
  {
    path: '',
    children: [
       { path:'usuarios-report', component: ReporteUsuarioComponent },
       { path: '**', redirectTo: 'home'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
