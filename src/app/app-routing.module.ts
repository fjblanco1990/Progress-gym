import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: LayoutComponent
  },
  {
    path: 'clientes',
    loadChildren: () => import('./Clientes/clientes.module').then(module => module.ClientesModule)
  },
  {
    path: 'ingresos',
    loadChildren: () => import('./Ingresos/ingresos.module').then(module => module.IngresosModule)
  },
  {
    path: 'maestros',
    loadChildren: () => import('./Maestros/maestros.module').then(module => module.MaestrosModule)
  },
  {
    path: 'deudas',
    loadChildren: () => import('./DeduasByCliente/deudas.module').then(module => module.DeudasModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./reportes/reportes.module').then(module => module.ReportesModule)
  },
  {
    path: '*',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
