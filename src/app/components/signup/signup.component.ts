import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  signupForm = this.fb.group({
    userName: ['', Validators.required],
    email: ['', Validators.email, Validators.required],
    password: ['',Validators.required],
    confirmPassword: [''],
  });

  ngOnInit(): void {}

  onSubmit() {
    console.log('value', this.signupForm);
  }
}
