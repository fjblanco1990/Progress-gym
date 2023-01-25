import { TestBed } from '@angular/core/testing';

import { ModalIngresoService } from './modal-ingreso.service';

describe('ModalIngresoService', () => {
  let service: ModalIngresoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalIngresoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
