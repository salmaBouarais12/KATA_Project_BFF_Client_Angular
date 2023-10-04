import { Component } from '@angular/core';
import { configEndpointsApi } from '../api/config-endpoints-api';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { RoomService } from '../services/room.service';
import { Room } from '../domain/room';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  rooms: Room[] = [];
  constructor(private http: HttpClient,private roomService: RoomService) { }

  loadRooms() {
    this.roomService.getRooms()
      .subscribe(rooms => {
        this.rooms = rooms;
      });
  }

  getUser() {
    console.log("test");
    return this.http.get(configEndpointsApi.endpoints.identityProvider.read).subscribe((response:any)=>{
      console.log(response.data[5].value)
    });
  }
}
