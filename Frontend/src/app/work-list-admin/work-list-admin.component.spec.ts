import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkListAdminComponent } from './work-list-admin.component';

describe('WorkListAdminComponent', () => {
  let component: WorkListAdminComponent;
  let fixture: ComponentFixture<WorkListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkListAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
