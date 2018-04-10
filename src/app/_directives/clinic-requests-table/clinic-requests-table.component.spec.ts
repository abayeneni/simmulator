import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicRequestsTableComponent } from './clinic-requests-table.component';

describe('ClinicRequestsTableComponent', () => {
  let component: ClinicRequestsTableComponent;
  let fixture: ComponentFixture<ClinicRequestsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicRequestsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
