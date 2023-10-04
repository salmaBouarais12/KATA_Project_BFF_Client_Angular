import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/domain/booking';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent {
  bookingForm: FormGroup;
  booking!: Booking;

  constructor(private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private formBuilder: UntypedFormBuilder,
    private router: Router) {
    this.bookingForm = this.formBuilder.group(
      {
        roomId: ['', Validators.required],
        personId: ['', Validators.required],
        bookingDate: ['', Validators.required],
        startSlot: ['', Validators.required],
        endSlot: ['', Validators.required],
      }
    )
  }

  ngOnInit(): void {
    this.loadBooking();
  }

  loadBooking() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.bookingService.getBookingById(id).subscribe((data: Booking) => {
      this.booking = data;
      this.bookingForm.patchValue({
        roomId: this.booking.roomId,
        personId: this.booking.personId,
        bookingDate: this.booking.bookingDate,
        startSlot: this.booking.startSlot,
        endSlot: this.booking.endSlot,
      })
    });
  }

  onSubmit() {
    
  }
  
  backHome(){
    this.router.navigateByUrl("bookings");
  }
}