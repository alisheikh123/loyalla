import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUploadClassesComponent } from './edit-upload-classes.component';

describe('EditUploadClassesComponent', () => {
  let component: EditUploadClassesComponent;
  let fixture: ComponentFixture<EditUploadClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUploadClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUploadClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
