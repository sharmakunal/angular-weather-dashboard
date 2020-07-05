import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { PanelComponent } from './panel/panel.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpClientModule, BrowserAnimationsModule],
  declarations: [ AppComponent, HelloComponent, PanelComponent ],
  bootstrap:    [ AppComponent ],
  providers: [WeatherService]
})
export class AppModule { }
