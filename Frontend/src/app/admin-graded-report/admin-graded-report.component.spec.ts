import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGradedReportComponent } from './admin-graded-report.component';

describe('AdminGradedReportComponent', () => {
  let component: AdminGradedReportComponent;
  let fixture: ComponentFixture<AdminGradedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGradedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGradedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
