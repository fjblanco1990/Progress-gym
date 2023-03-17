import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacionesService } from 'src/app/services/Config/seewtAlert.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario_Model } from 'src/app/Maestros/components/usuairos/class/Usuarios.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maestros-dash',
  templateUrl: './maestros-dash.component.html',
  styleUrls: ['./maestros-dash.component.scss']
})
export class MaestrosDashComponent implements OnInit {

  constructor( ) { }

  ngOnInit(): void {

   
  }


 
  
}
