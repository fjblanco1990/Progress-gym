import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarFormComponent } from './registrar-form.component';

describe('RegistrarFormComponent', () => {
  let component: RegistrarFormComponent;
  let fixture: ComponentFixture<RegistrarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
