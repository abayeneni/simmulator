import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicRequestComponent } from './clinic-request.component';

describe('ClinicRequestComponent', () => {
  let component: ClinicRequestComponent;
  let fixture: ComponentFixture<ClinicRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
