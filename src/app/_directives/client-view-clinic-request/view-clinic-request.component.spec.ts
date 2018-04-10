import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClinicRequestComponent } from './view-clinic-request.component';

describe('CreateClinicRequestComponent', () => {
  let component: ViewClinicRequestComponent;
  let fixture: ComponentFixture<ViewClinicRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClinicRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClinicRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
