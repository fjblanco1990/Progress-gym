import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackBottomComponent } from './back-bottom.component';

describe('BackBottomComponent', () => {
  let component: BackBottomComponent;
  let fixture: ComponentFixture<BackBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackBottomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
