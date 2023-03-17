import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudasComponent } from './deudas.component';

describe('DeudasComponent', () => {
  let component: DeudasComponent;
  let fixture: ComponentFixture<DeudasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeudasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeudasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
