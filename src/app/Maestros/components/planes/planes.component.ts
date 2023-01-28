import { Component, OnInit } from '@angular/core';
import { PlanesService } from '../../services/planes.service';
import { PlanModel } from '../../../components/class/planes.class';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.scss']
})
export class PlanesComponent implements OnInit {
  habilitarModal: boolean = true;
  p: number = 1;
  planesData: PlanModel[] = [];
  constructor(private _planService: PlanesService) { }

  ngOnInit(): void {
    this.getPlanes();
  }

  desactiveRegistroIngreso() {
    this.habilitarModal = false;
  }

  habilitarRegistroIngreso() {
    this.habilitarModal = true;
  }

  getPlanes() {
    this._planService.getPlanes().subscribe( result => this.planesData =  result);
  }

}
