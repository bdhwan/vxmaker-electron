import { TestBed, inject } from '@angular/core/testing';

import { CodeGeneratorService } from './code-generator.service';

describe('CodeGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeGeneratorService]
    });
  });

  it('should be created', inject([CodeGeneratorService], (service: CodeGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
