import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFeedComponent } from './store-feed.component';

describe('StoreFeedComponent', () => {
  let component: StoreFeedComponent;
  let fixture: ComponentFixture<StoreFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
