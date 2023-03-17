import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeudasComponent } from './pages/deudas/deudas.component';

const routes: Routes = [
  {
    path: '',
    children: [
       { path:'deuda', component: DeudasComponent },
       { path: '**', redirectTo: 'deuda'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeudasRoutingModule { }
