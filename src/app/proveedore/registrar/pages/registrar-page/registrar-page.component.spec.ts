import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPageComponent } from './registrar-page.component';

describe('RegistrarPageComponent', () => {
  let component: RegistrarPageComponent;
  let fixture: ComponentFixture<RegistrarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
