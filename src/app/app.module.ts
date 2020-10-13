import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingComponent } from './components/landing/landing.component';
import { InputfieldComponent } from './shared/inputfield/inputfield.component';
import { ButtonComponent } from './shared/button/button.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { LoginComponent } from './components/login/login.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthEffect } from './store/effects/auth.effects';
import { AuthReducer } from './store/reducers/auth.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthGuard } from './authGuard/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ProfileComponent } from './components/profile/profile.component';
import { FilterComponent } from './components/filter/filter.component';
import { SortComponent } from './components/sort/sort.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LandingComponent,
    InputfieldComponent,
    ButtonComponent,
    LoginComponent,
    LoadingComponent,
    ProfileComponent,
    FilterComponent,
    SortComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffect]),
    StoreModule.forRoot({ user: AuthReducer }, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
