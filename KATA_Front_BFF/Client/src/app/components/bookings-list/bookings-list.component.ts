import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Booking } from 'src/app/domain/booking';
import { BookingService } from 'src/app/services/booking.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.css']
})
export class BookingsListComponent implements OnInit{
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService,private datePipe: DatePipe,
    private router: Router,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getBookings()
      .subscribe(bookings => {
        this.bookings = bookings;
      });
  }

  addBooking(){
    this.router.navigateByUrl("/add-booking");
  }

  deleteBooking(booking: Booking) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.bookingService.deleteBooking(booking).subscribe(() => {
          this.router.navigateByUrl('');
        });
      }
    });
  }
}
