import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestrosDashComponent } from './maestros-dash.component';

describe('MaestrosDashComponent', () => {
  let component: MaestrosDashComponent;
  let fixture: ComponentFixture<MaestrosDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestrosDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestrosDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
