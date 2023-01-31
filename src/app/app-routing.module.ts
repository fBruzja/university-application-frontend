import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { CourseCalendarComponent } from './courses/course-calendar/course-calendar.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CoursesOverviewComponent } from './courses/courses-overview/courses-overview.component';
import { LoginComponent } from './login/login.component';
import { NotFoundPageComponent } from './shared/component/not-found-page/not-found-page.component';
import { SignupComponent } from './signup/signup.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
    {
        path: 'courses',
        component: CoursesOverviewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'courses/:id',
        component: CourseDetailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'calendar',
        component: CourseCalendarComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'user/:id',
        component: UserDetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'courses',
    },
    {
        path: '**',
        component: NotFoundPageComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
