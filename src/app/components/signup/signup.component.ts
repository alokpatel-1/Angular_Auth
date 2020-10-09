import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import {
  SignupFailure,
  SignupSuccess,
  Signup,
} from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store
  ) {}
  signupForm = this.fb.group({
    userName: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    confirmPassword: [''],
  });

  errorMessage = {
    userNameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  };

  ngOnInit(): void {}

  onSubmit() {
    if (this.signupForm.status !== 'INVALID') {
      // handel confirm password validton if form is valid
      if (
        this.signupForm.controls.confirmPassword.value !==
        this.signupForm.controls.password.value
      ) {
        this.errorMessage.confirmPasswordError = "Password doesn't match";
        this.errorMessage.passwordError = '';
        this.errorMessage.userNameError = '';
        this.errorMessage.emailError = '';
      } else {
        // submitForm function run if form is valid and password are same
        this.submitForm(this.signupForm.value);
      }
      console.log('inside else', this.signupForm.status);
    } else {
      // blank input field handling code
      if (this.signupForm.controls.userName.value === '') {
        this.errorMessage.userNameError = 'This field is required';
      }
      if (this.signupForm.controls.email.value === '') {
        this.errorMessage.emailError = 'This field is required';
      } else {
        if (this.signupForm.controls.email.status === 'INVALID') {
          this.errorMessage.emailError = 'Invalid email';
        }
      }
      if (this.signupForm.controls.password.value === '') {
        this.errorMessage.passwordError = 'This field is required';
      }
      if (this.signupForm.controls.confirmPassword.value === '') {
        this.errorMessage.confirmPasswordError = 'This field is required';
      }
    }
  }

  submitForm(userDetails: FormGroup) {
    this.store.dispatch(new Signup({ payload: this.signupForm.value }));
    console.log('user details', userDetails);
  }
}
