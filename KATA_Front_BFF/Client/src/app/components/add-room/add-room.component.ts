import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Room } from 'src/app/domain/room';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit{

  roomForm: FormGroup;
  rooms: Room[] = [];

  constructor(private roomService: RoomService,private router: Router,
              private formBuilder: FormBuilder) {  
    this.roomForm = this.formBuilder.group(
      {
        roomName: ['', Validators.required],
      }
    )
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.roomForm.valid) {
      const room: Room = {
        roomName: this.roomForm.value.roomName,
        id: 0
      };
      this.roomService.addUser(room).subscribe(() => {
        this.router.navigateByUrl("rooms");
      });
    }
  }

  backHome(){
    this.router.navigateByUrl("rooms");
  }
}
