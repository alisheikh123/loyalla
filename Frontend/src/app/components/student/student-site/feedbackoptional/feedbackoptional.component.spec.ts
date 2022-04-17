import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackoptionalComponent } from './feedbackoptional.component';

describe('FeedbackoptionalComponent', () => {
  let component: FeedbackoptionalComponent;
  let fixture: ComponentFixture<FeedbackoptionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackoptionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackoptionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
