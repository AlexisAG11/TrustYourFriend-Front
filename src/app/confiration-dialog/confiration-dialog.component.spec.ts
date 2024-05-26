import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirationDialogComponent } from './confiration-dialog.component';

describe('ConfirationDialogComponent', () => {
  let component: ConfirationDialogComponent;
  let fixture: ComponentFixture<ConfirationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirationDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
