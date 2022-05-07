import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPaperComponent } from './student-paper.component';

describe('StudentPaperComponent', () => {
  let component: StudentPaperComponent;
  let fixture: ComponentFixture<StudentPaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentPaperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
