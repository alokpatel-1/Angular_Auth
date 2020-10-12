import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  userName$: string;
  name: Object;
  constructor(private store: Store<{ user: object }>,
     private authservice:AuthService,
     private router:Router) {
    this.store.select('user').subscribe((res) => {
      if (res['user'] !== null) {
        this.userName$ = res['user']['userName'];
      }
    });
  }

  ngOnInit(): void {
     this.authservice.landing().subscribe(res=>{},
      err =>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 500){
            console.log('unAuthorizesd access');
            this.router.navigate(['/login'])
          }
        }
      }
    )
  }
}
