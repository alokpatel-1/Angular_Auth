import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [''],
  });

  errorMessage = {
    emailError: '',
    passwordError: '',
  };
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.status !== 'INVALID') {
      // API code
    } else {
      if (this.loginForm.controls.email.value === '') {
        this.errorMessage.emailError = 'This field is required';
      } else {
        if (this.loginForm.controls.email.status === 'INVALID') {
          this.errorMessage.emailError = 'Invalid Email';
        }
      }

      if (this.loginForm.controls.password.value === '') {
        this.errorMessage.passwordError = 'This field is required';
      }
    }
    console.log(this.loginForm.value);
    console.log('email', this.loginForm.controls.email.status);
  }
}
