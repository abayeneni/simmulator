import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicRequestMultipleComponent } from './clinic-request-multiple.component';

describe('ClinicRequestComponent', () => {
  let component: ClinicRequestMultipleComponent;
  let fixture: ComponentFixture<ClinicRequestMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicRequestMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicRequestMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
