import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkRequestFeedComponent } from './work-request-feed.component';

describe('WorkRequestFeedComponent', () => {
  let component: WorkRequestFeedComponent;
  let fixture: ComponentFixture<WorkRequestFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkRequestFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkRequestFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
