import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/domain/room';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit{
  roomForm: FormGroup;
  room!: Room;

  constructor(private activatedRoute: ActivatedRoute,
    private roomService: RoomService,
    private formBuilder: UntypedFormBuilder,
    private router: Router) {
    this.roomForm = this.formBuilder.group(
      {
        roomName: ['', Validators.required]
      }
    )
  }

  ngOnInit(): void {
    this.loadRoom();
  }

  loadRoom() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.roomService.getRoomById(id).subscribe((data: Room) => {
      this.room = data;
      this.roomForm.patchValue({
        roomName: this.room.roomName,
      })
    });
  }

  onSubmit() {
    if (this.roomForm.valid) {
      const room: Room = {
        id: this.room.id,
        roomName: this.roomForm.value.roomName
      };
      this.roomService.editRoom(room).subscribe(() => {
        this.router.navigateByUrl("rooms");
      });
    }
  }
  
  backHome(){
    this.router.navigateByUrl("rooms");
  }
}
