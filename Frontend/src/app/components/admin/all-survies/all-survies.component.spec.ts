import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSurviesComponent } from './all-survies.component';

describe('AllSurviesComponent', () => {
  let component: AllSurviesComponent;
  let fixture: ComponentFixture<AllSurviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSurviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSurviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
