import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedRightComponent } from './feed-right.component';

describe('FeedRightComponent', () => {
  let component: FeedRightComponent;
  let fixture: ComponentFixture<FeedRightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedRightComponent]
    });
    fixture = TestBed.createComponent(FeedRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
