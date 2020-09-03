// Modulos de Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

// Modulos propios
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

// Components
import { AppComponent } from './app.component';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { DonaComponent } from './compontets/dona/dona.component';


@NgModule({
  declarations: [
    AppComponent,
    NotpagefoundComponent,
    DonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
