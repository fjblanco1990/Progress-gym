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
    path: '*',
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
    path: 'proveedores',
    loadChildren: () => import('./proveedore/proveedore.module').then(module => module.ProveedoreModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
