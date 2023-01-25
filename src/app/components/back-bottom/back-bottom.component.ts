import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-back-bottom',
  templateUrl: './back-bottom.component.html',
  styleUrls: ['./back-bottom.component.scss']
})
export class BackBottomComponent implements OnInit {

  @Input() form!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  resetForms() {
    if (this.form !== undefined) {
       this.form.reset();
    }
  }

}
