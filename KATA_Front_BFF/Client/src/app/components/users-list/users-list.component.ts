import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/domain/user';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{
  users: User[] = [];

  constructor(private userService: UserService, private router: Router,private dialog: MatDialog) { }
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  editUser(user : User){
    this.router.navigateByUrl("/edit-user/" + user.id)
  }

  addUser(){
    this.router.navigateByUrl("/add-user")
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(user).subscribe(() => {
          this.router.navigateByUrl('');
        });
      }
    });
  }
}
