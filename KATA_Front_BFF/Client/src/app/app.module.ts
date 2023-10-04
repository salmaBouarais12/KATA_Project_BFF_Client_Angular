import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddUserComponent } from './components/add-user/add-user.component';
import { HeaderComponent } from './header/header.component';
import { RoomsListComponent } from './components/rooms-list/rooms-list.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { BookingsListComponent } from './components/bookings-list/bookings-list.component';
import { EditBookingComponent } from './components/edit-booking/edit-booking.component';
import { AddBookingComponent } from './components/add-booking/add-booking.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersListComponent,
    EditUserComponent,
    ConfirmDialogComponent,
    AddUserComponent,
    RoomsListComponent,
    EditRoomComponent,
    AddRoomComponent,
    BookingsListComponent,
    EditBookingComponent,
    AddBookingComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
