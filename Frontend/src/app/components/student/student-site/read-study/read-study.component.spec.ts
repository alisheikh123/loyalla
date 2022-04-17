import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadStudyComponent } from './read-study.component';

describe('ReadStudyComponent', () => {
  let component: ReadStudyComponent;
  let fixture: ComponentFixture<ReadStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadStudyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
