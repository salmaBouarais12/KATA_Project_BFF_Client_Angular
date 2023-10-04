import { Component } from '@angular/core';

@Component({
  selector: 'app-room-not-available',
  templateUrl: './room-not-available.component.html',
  styleUrls: ['./room-not-available.component.css']
})
export class RoomNotAvailableComponent {
  showDialog = false;

  openDialog() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }
}
