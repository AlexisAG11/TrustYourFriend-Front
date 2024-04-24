import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedHeaderComponent } from './feed-header.component';

describe('FeedHeaderComponent', () => {
  let component: FeedHeaderComponent;
  let fixture: ComponentFixture<FeedHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedHeaderComponent]
    });
    fixture = TestBed.createComponent(FeedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
