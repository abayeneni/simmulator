import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityFeedComponent } from './capacity-feed.component';

describe('CapacityFeedComponent', () => {
  let component: CapacityFeedComponent;
  let fixture: ComponentFixture<CapacityFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacityFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
