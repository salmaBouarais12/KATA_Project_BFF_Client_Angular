import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from '../domain/room';
import { Observable, map } from 'rxjs';
import { RoomsResponse } from './dtos/RoomsResponse';
import { configEndpointsApi } from '../api/config-endpoints-api';
import { RoomResponse } from './dtos/RoomResponse';

@Injectable({
  providedIn: 'root'
})

export class RoomService {
  
  private headers = new HttpHeaders({
    "X-CSRF": "1"
  });
  constructor(private http: HttpClient) { }

  private createOptions(): { headers: HttpHeaders } {
    return { headers: this.headers };
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<RoomsResponse>(configEndpointsApi.endpoints.rooms.read, this.createOptions())
      .pipe(map(this.mapRoomsResponseToRooms));
  }

  getRoomById(id : number): Observable<Room> {
    return this.http.get<RoomResponse>(configEndpointsApi.endpoints.rooms.read + "/" + id, this.createOptions());
  }

  addUser(room: Room) : Observable<Room> {
    return this.http.post<RoomResponse>(configEndpointsApi.endpoints.rooms.read, {
      ...room,
    }, this.createOptions());
  }

  editRoom(room: Room) : Observable<Room> {
    return this.http.put<RoomResponse>(configEndpointsApi.endpoints.rooms.edit + room.id, {
      ...room,
    }, this.createOptions());
  }

  deleteRoom(user: Room) : Observable<Room> {
    return this.http.delete<RoomResponse>(configEndpointsApi.endpoints.rooms.edit + user.id, this.createOptions());
  }

  mapRoomsResponseToRooms(response: RoomsResponse): Room[] {
    return response.rooms.map(r => ({
      id:r.id,
      roomName: r.roomName,
    }));
  }
}
