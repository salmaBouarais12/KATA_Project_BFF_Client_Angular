import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/domain/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  user!: User;

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: UntypedFormBuilder,
    private router: Router) {
    this.userForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }
    )
  }
  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.userService.getUserById(id).subscribe((data: User) => {
      this.user = data;
      this.userForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
      })
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user: User = {
        id: this.user.id,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName
      };
      this.userService.editUser(user).subscribe(() => {
        this.router.navigateByUrl("users");
      });
    }
  }
}
