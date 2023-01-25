import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarIngresosComponent } from './consultar-ingresos.component';

describe('ConsultarIngresosComponent', () => {
  let component: ConsultarIngresosComponent;
  let fixture: ComponentFixture<ConsultarIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarIngresosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
