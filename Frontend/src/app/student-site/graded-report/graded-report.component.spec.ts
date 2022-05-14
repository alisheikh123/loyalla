import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradedReportComponent } from './graded-report.component';

describe('GradedReportComponent', () => {
  let component: GradedReportComponent;
  let fixture: ComponentFixture<GradedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
