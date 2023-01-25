import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarComponent } from './consultar.component';

describe('ConsultarComponent', () => {
  let component: ConsultarComponent;
  let fixture: ComponentFixture<ConsultarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
