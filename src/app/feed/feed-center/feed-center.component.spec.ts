import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedCenterComponent } from './feed-center.component';

describe('FeedCenterComponent', () => {
  let component: FeedCenterComponent;
  let fixture: ComponentFixture<FeedCenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedCenterComponent]
    });
    fixture = TestBed.createComponent(FeedCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
