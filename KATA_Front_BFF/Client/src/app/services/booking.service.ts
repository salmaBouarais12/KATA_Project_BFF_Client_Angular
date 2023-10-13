import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { configEndpointsApi } from '../api/config-endpoints-api';
import { Booking } from '../domain/booking';
import { BookingsResponse } from './dtos/BookingsResponse';
import { BookingResponse } from './dtos/BookingResponse';

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  private headers = new HttpHeaders({
    "X-CSRF": "1"
  });

  constructor(private http: HttpClient) { }

  private createOptions(): { headers: HttpHeaders } {
    return { headers: this.headers };
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<BookingsResponse>(configEndpointsApi.endpoints.bookings.read, this.createOptions())
      .pipe(map(this.mapBookingsResponseToBookings));
  }

  getBookingById(id : number): Observable<Booking> {
    return this.http.get<BookingResponse>(configEndpointsApi.endpoints.bookings.read + "/" + id, this.createOptions());
  }

  addBooking(booking: Booking) : Observable<Booking> {
    return this.http.post<BookingResponse>(configEndpointsApi.endpoints.bookings.read, {
      ...booking,
    }, this.createOptions());
  }

  deleteBooking(booking: Booking) : Observable<Booking> {
    return this.http.delete<BookingResponse>(configEndpointsApi.endpoints.bookings.edit + booking.id, this.createOptions());
  }

  getBookingsForRoom(roomId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(configEndpointsApi.endpoints.bookings.readBookingForRoom + roomId, this.createOptions());
  }

  mapBookingsResponseToBookings(response: BookingsResponse): Booking[] {
    return response.bookings.map(b =>({
      id:b.id,
      roomId:b.roomId,
      personId: b.personId,
      bookingDate: b.bookingDate,
      startSlot: b.startSlot,
      endSlot: b.endSlot
    }));
  }
}