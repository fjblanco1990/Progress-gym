import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorDashComponent } from './page/proveedor-dash/proveedor-dash.component';

const routes: Routes = [
  // {
  //   path: 'registrar',
  //   loadChildren: () => import('./registrar/registrar.module').then(module => module.RegistrarModule)
  // },
  {
    path: '',
    component: ProveedorDashComponent,
    children: [
      {
        path: 'registrar',
        loadChildren: () => import('./registrar/registrar.module').then(module => module.RegistrarModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoreRoutingModule { }
