import { TestBed } from '@angular/core/testing';

import { BudgetStatisticService } from './budget-statistic.service';

describe('BudgetStatisticService', () => {
  let service: BudgetStatisticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetStatisticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
