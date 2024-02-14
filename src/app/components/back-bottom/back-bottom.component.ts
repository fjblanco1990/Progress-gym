import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-back-bottom',
  templateUrl: './back-bottom.component.html',
  styleUrls: ['./back-bottom.component.scss']
})
export class BackBottomComponent implements OnInit {

  @Input() form!: UntypedFormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  resetForms() {
    localStorage.setItem('active', '0');
    if (this.form !== undefined) {
       this.form.reset();
    }
  }

}
