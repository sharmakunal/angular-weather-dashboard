import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WeatherInfo } from "../model/weather-info";
import { WeatherService } from "../weather.service";
import { Subscription, timer } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-panel",
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.css"]
})
export class PanelComponent implements OnInit {
  @Input() placeHolder: string;
  cityName: string;
  isReadOnly: boolean;
  weatherIcon: string;
  weatherDescription: string;
  currentTemp: number;
  errorMessage: string;
  tempInCelsius = "";
  subscription: Subscription;
  statusText: string;
  private iconUrl = "https://openweathermap.org/img/wn/";

  constructor(
    private http: HttpClient,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.isReadOnly = false;
  }

  /**
   * Search the weather by city name
   */
  search() {
    this.subscription = timer(0, 10000)
      .pipe(  
        // switchMap cancels the last request, if no response have been received since last tick
        switchMap(() =>
          this.weatherService.getWeatherInfoByCityName(this.cityName)
        )
      )
      .subscribe(
        (weatherInfo: WeatherInfo) => {
          this.errorMessage = "";
          this.currentTemp = weatherInfo.main.temp;
          this.tempInCelsius = "℃";
          this.weatherIcon =
            this.iconUrl + weatherInfo.weather[0].icon + "@2x.png";
          this.weatherDescription = weatherInfo.weather[0].main;
          this.isReadOnly = true;
        },
        error => {
          //Error callback
          this.unsetFields();
          this.isReadOnly = false;
          this.errorMessage = "City not found";
          console.error("error caught in component " + error);
        }
      );
  }

  /**
   * allow to edit search field
   */
  edit() {
    this.subscription.unsubscribe();
    this.isReadOnly = false;
  }

  /**
   * unset the fields on city not found and error
   */
  unsetFields() {
    this.currentTemp = null;
    this.tempInCelsius = "";
    this.weatherIcon = "";
    this.weatherDescription = "";
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
