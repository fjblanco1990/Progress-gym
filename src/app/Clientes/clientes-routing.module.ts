import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarComponent } from './pages/consultar/consultar.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';

const routes: Routes = [
  {
    path: '',
    children: [
       { path:'registrarclientes/:edit', component: RegistrarComponent },
       { path:'consultarclientes', component: ConsultarComponent },
       { path: '**', redirectTo: 'resgitrar'}
    ]
  }
 
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],

})
export class ClientesRoutingModule { }
