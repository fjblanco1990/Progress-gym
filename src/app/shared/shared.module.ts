import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { NgxTablePaginationModule } from 'ngx-table-pagination';
//import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule,
    //NgxTablePaginationModule
    //NgxLoadingModule.forRoot({})
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    LayoutComponent
  ]
})
export class SharedModule { }
