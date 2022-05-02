import { TestBed } from '@angular/core/testing';

import { CertificadoService } from './certificado.service';

describe('CertificadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CertificadoService = TestBed.get(CertificadoService);
    expect(service).toBeTruthy();
  });
});
