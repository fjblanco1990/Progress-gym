import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConceptosComponent } from './conceptos/conceptos.component';
import { PlanesComponent } from './planes/planes.component';
import { DashComponent } from './dash/dash.component';
import { UsuairosComponent } from './usuairos/usuairos.component';

const routes: Routes = [
  { path: '', component: DashComponent,
    children: [ 
      {
        path: 'Planes', component: PlanesComponent 
      },
      {
        path: 'Conceptos', component: ConceptosComponent 
      },
      {
        path: 'Usuarios', component: UsuairosComponent
      }

    ]
   }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
