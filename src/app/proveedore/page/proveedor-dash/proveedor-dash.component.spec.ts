import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorDashComponent } from './proveedor-dash.component';

describe('ProveedorDashComponent', () => {
  let component: ProveedorDashComponent;
  let fixture: ComponentFixture<ProveedorDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
