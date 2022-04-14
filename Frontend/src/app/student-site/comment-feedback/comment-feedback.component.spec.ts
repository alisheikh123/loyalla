import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFeedbackComponent } from './comment-feedback.component';

describe('CommentFeedbackComponent', () => {
  let component: CommentFeedbackComponent;
  let fixture: ComponentFixture<CommentFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
