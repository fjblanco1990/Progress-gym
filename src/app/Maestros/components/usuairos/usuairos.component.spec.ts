import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuairosComponent } from './usuairos.component';

describe('UsuairosComponent', () => {
  let component: UsuairosComponent;
  let fixture: ComponentFixture<UsuairosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuairosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuairosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
