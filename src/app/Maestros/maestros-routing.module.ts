import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaestrosDashComponent } from './pages/maestros-dash/maestros-dash.component';

const routes: Routes = [
  // {
  //   path: 'registrar',
  //   loadChildren: () => import('./registrar/registrar.module').then(module => module.RegistrarModule)
  // },
  {
    path: '',
    component: MaestrosDashComponent,
    children: [
      {
        path: 'configuracion',
        loadChildren: () => import('./../Maestros/components/components.module').then(module => module.ComponentsMasterModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaestrosRoutingModule { }
