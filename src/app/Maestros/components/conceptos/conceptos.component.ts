import { Component, OnInit } from '@angular/core';
import { ConceptoService } from '../../services/conceptos.service';
import { ConceptoModel } from '../../../components/class/conceptos.class';

@Component({
  selector: 'app-conceptos',
  templateUrl: './conceptos.component.html',
  styleUrls: ['./conceptos.component.scss']
})
export class ConceptosComponent implements OnInit {

  habilitarModal: boolean = true;
  con: number = 1;
  conceptosData: ConceptoModel[] = [];
  constructor(private _conceptoService: ConceptoService) { }

  ngOnInit(): void {
    this.getConceptos();
  }

  desactiveRegistroIngreso() {
    this.habilitarModal = false;
  }

  habilitarRegistroIngreso() {
    this.habilitarModal = true;
  }

  getConceptos() {
    this._conceptoService.getConceptos().subscribe( result => this.conceptosData =  result);
  }
}
