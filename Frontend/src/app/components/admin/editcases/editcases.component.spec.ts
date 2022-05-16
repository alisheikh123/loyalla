import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcasesComponent } from './editcases.component';

describe('EditcasesComponent', () => {
  let component: EditcasesComponent;
  let fixture: ComponentFixture<EditcasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
