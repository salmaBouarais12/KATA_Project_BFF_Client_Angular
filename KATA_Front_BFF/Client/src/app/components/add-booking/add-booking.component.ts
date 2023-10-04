import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Booking } from 'src/app/domain/booking';
import { Room } from 'src/app/domain/room';
import { User } from 'src/app/domain/user';
import { BookingService } from 'src/app/services/booking.service';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit{
  bookingForm: FormGroup;
  bookings: Booking[] = [];
  rooms: Room[] = [];
  users: User[] = [];

  isRoomAvailable!: boolean;
  constructor(private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,private roomService: RoomService,private userService: UserService,
    private formBuilder: UntypedFormBuilder,
    private router: Router) {
      this.bookingForm = this.formBuilder.group({
        roomId: ['', Validators.required],
        personId: ['', Validators.required],
        bookingDate: ['', Validators.required],
        startSlot: ['', Validators.required],
        endSlot: ['', Validators.required],
      });
  }

  ngOnInit(): void {
    this.loadRooms();
    this.loadUsers();
  }

  loadRooms() {
    this.roomService.getRooms()
      .subscribe(rooms => {
        this.rooms = rooms;
      });
  }

  loadUsers() {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  checkRoomAvailability(roomSelected: number, bookingTime: Date, startSlot: number, endSlot: number): Observable<boolean> {
    return this.bookingService.getBookingsForRoom(roomSelected)
      .pipe(
        map((bookings) => {
          return !this.isBookingTimeConflict(bookings, bookingTime, startSlot, endSlot);
        })
      );
  }  

    isBookingTimeConflict(bookings: Booking[], requestedBookingDate: Date, requestedStartSlot: number, requestedEndSlot: number): boolean {
    const requestedStartTime = new Date(requestedBookingDate);
    requestedStartTime.setHours(requestedStartSlot, 0, 0, 0);
  
    const requestedEndTime = new Date(requestedBookingDate);
    requestedEndTime.setHours(requestedEndSlot, 0, 0, 0);
  
    return bookings.some((booking) => {
      const bookingStartTime = new Date(booking.bookingDate);
      bookingStartTime.setHours(booking.startSlot, 0, 0, 0);
  
      const bookingEndTime = new Date(booking.bookingDate);
      bookingEndTime.setHours(booking.endSlot, 0, 0, 0); 
      return (
        (requestedStartTime >= bookingStartTime && requestedStartTime < bookingEndTime) ||
        (requestedEndTime > bookingStartTime && requestedEndTime <= bookingEndTime) ||
        (requestedStartTime <= bookingStartTime && requestedEndTime >= bookingEndTime)
      );
    });
  }
  
  async onSubmit() {
    if (this.bookingForm.value.startSlot >= this.bookingForm.value.endSlot) {
      alert("The start date must be before the end date..");
      return;
    }
    try {
      const isRoomAvailableForBooking = await this.checkRoomAvailability(
        this.bookingForm.value.roomId,
        this.bookingForm.value.bookingDate,
        this.bookingForm.value.startSlot,
        this.bookingForm.value.endSlot
      );  
      if (isRoomAvailableForBooking) {
        // Room is available for booking
         const booking: Booking = {
        roomId: this.bookingForm.value.roomId,
        personId: this.bookingForm.value.personId,
        bookingDate:this.bookingForm.value.bookingDate,
        startSlot:this.bookingForm.value.startSlot,
        endSlot:this.bookingForm.value.endSlot,
        id: 0
        };
        this.bookingService.addBooking(booking).subscribe(() => {
        this.router.navigateByUrl("bookings");
      });
      } else {
        alert("Room is not available.");
      }
    } catch (error) {
      console.error("Error checking room availability:", error);
    }
  }
  

  backHome(){
    this.router.navigateByUrl("bookings");
  }
}
