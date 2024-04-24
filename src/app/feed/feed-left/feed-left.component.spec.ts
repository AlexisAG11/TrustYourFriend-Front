import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedLeftComponent } from './feed-left.component';

describe('FeedLeftComponent', () => {
  let component: FeedLeftComponent;
  let fixture: ComponentFixture<FeedLeftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedLeftComponent]
    });
    fixture = TestBed.createComponent(FeedLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
