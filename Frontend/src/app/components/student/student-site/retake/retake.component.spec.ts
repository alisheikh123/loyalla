import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetakeComponent } from './retake.component';

describe('RetakeComponent', () => {
  let component: RetakeComponent;
  let fixture: ComponentFixture<RetakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
