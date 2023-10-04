import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Room } from 'src/app/domain/room';
import { RoomService } from 'src/app/services/room.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit{
  rooms: Room[] = [];

  constructor(private roomService: RoomService, private router: Router,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms() {
    this.roomService.getRooms()
      .subscribe(rooms => {
        this.rooms = rooms;
      });
  }

  editRoom(room : Room){
    this.router.navigateByUrl("/edit-room/" + room.id);
  }

  addRoom(){
    this.router.navigateByUrl("/add-room");
  }

  deleteRoom(room: Room) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.roomService.deleteRoom(room).subscribe(() => {
          this.router.navigateByUrl('');
        });
      }
    });
  }
}
