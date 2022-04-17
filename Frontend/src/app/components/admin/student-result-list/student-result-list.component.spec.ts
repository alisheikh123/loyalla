import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentResultListComponent } from './student-result-list.component';

describe('StudentResultListComponent', () => {
  let component: StudentResultListComponent;
  let fixture: ComponentFixture<StudentResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentResultListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
