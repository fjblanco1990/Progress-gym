import { Component, OnInit, Output } from '@angular/core';
import { PlanModel } from '../class/planes.class';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.scss']
})
export class PlanesComponent implements OnInit {
  @Output() planData: PlanModel[] = [];
  constructor() { }

  ngOnInit(): void {
  }



}
