// Modules
import { NgModule, Component } from '@angular/core';
import { RouterModule, Route, Routes} from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

// Components
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';

const routes: Routes = [
  // path: '/dashboard' PageRoutingModule
  // path: '/login' AuthRoutingModule

  {  path: '', redirectTo: '/dashboard' , pathMatch: 'full' },
  {  path: '**', component: NotpagefoundComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
