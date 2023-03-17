import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
    
    const active = localStorage.getItem('active');
    if (active !== '1' ) {
      this.route.navigateByUrl('/home')
    }
  }

}
