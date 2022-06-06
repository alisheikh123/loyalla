import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSurveyDetailComponent } from './student-survey-detail.component';

describe('StudentSurveyDetailComponent', () => {
  let component: StudentSurveyDetailComponent;
  let fixture: ComponentFixture<StudentSurveyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentSurveyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSurveyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
