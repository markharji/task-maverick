import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserCardsComponent } from './components/user-cards/user-cards.component';
import { HttpClientModule } from '@angular/common/http';
import { UserCardComponent } from './components/user-card/user-card.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { UserMapComponent } from './components/user-map/user-map.component';
import { HourlyWeatherComponent } from './components/hourly-weather/hourly-weather.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    UserCardsComponent,
    UserCardComponent,
    UserMapComponent,
    HourlyWeatherComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LeafletModule,
    NgbModule,
    NgbNavModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
