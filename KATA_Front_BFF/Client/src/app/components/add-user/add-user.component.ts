import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/domain/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  userForm: FormGroup;
  users: User[] = [];

  constructor(private userService: UserService,private router: Router,
              private formBuilder: FormBuilder) {  
    this.userForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }
    )
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user: User = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        id: 0
      };
      this.userService.addUser(user).subscribe(() => {
        this.router.navigateByUrl("users");
      });
    }
  }

  backHome(){
    this.router.navigateByUrl("users");
  }
}
