import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNavBarComponent } from './student-nav-bar.component';

describe('StudentNavBarComponent', () => {
  let component: StudentNavBarComponent;
  let fixture: ComponentFixture<StudentNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
