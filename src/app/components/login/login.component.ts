import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginRequest } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMsg$: any;
  loading:boolean
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [''],
  });

  errorMessage = {
    emailError: '',
    passwordError: '',
  };
  constructor(private fb: FormBuilder, private store: Store<{ user: object }>) {
    this.store.select('user').subscribe((res) => {
      this.errorMsg$ = res['error'];
      this.loading = res['loading']
    });
  }
  
  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.loginForm.status !== 'INVALID') {
      // API code
      this.store.dispatch(new LoginRequest({ payload: this.loginForm.value }));
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
  }
}
