import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadClassesComponent } from './upload-classes.component';

describe('UploadClassesComponent', () => {
  let component: UploadClassesComponent;
  let fixture: ComponentFixture<UploadClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
