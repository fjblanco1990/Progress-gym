import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarPageComponent } from './pages/registrar-page/registrar-page.component';
import { RegistrarFormComponent } from './components/registrar-form/registrar-form.component';

const routes: Routes = [
  { path: '', component: RegistrarPageComponent, 
    children: [ 
      {
        path: 'form', component: RegistrarFormComponent
      }
    ]
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarRoutingModule { }
