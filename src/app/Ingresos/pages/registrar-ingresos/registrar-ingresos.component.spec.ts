import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarIngresosComponent } from './registrar-ingresos.component';

describe('RegistrarIngresosComponent', () => {
  let component: RegistrarIngresosComponent;
  let fixture: ComponentFixture<RegistrarIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarIngresosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
