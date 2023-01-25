import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarRoutingModule } from './registrar-routing.module';
import { RegistrarPageComponent } from './pages/registrar-page/registrar-page.component';
import { RegistrarFormComponent } from './components/registrar-form/registrar-form.component';


@NgModule({
  declarations: [
    RegistrarPageComponent,
    RegistrarFormComponent
  ],
  imports: [
    CommonModule,
    RegistrarRoutingModule
  ]
})
export class RegistrarModule { }
