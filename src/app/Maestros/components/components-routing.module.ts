import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaestrosDashComponent } from '../pages/maestros-dash/maestros-dash.component';

import { ConceptosComponent } from './conceptos/conceptos.component';
import { PlanesComponent } from './planes/planes.component';
import { DashComponent } from './dash/dash.component';

const routes: Routes = [
  { path: '', component: DashComponent,
    children: [ 
      {
        path: 'Planes', component: PlanesComponent 
      },
      {
        path: 'Conceptos', component: ConceptosComponent 
      },

    ]
   }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
