import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from 'src/layout/header/header.component';
import { MainComponent } from 'src/layout/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToolbarComponent } from './ui/toolbar/toolbar.component';
import { LoginComponent } from './login/login.component';
import { InputComponent } from './ui/input/input.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpandableComponent } from './ui/expandable/expandable.component';
import { NotFoundPageComponent } from './shared/component/not-found-page/not-found-page.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { OverlayComponent } from './shared/component/overlay/overlay.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    HeaderComponent,
    ToolbarComponent,
    MainComponent,
    LoginComponent,
    InputComponent,
    DashboardComponent,
    ExpandableComponent,
    NotFoundPageComponent,
    LoginFormComponent,
    OverlayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  providers: [
    AuthGuard,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  ],
  bootstrap: [MainComponent],
})
export class AppModule {}
