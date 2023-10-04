import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomNotAvailableComponent } from './room-not-available.component';

describe('RoomNotAvailableComponent', () => {
  let component: RoomNotAvailableComponent;
  let fixture: ComponentFixture<RoomNotAvailableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomNotAvailableComponent]
    });
    fixture = TestBed.createComponent(RoomNotAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
