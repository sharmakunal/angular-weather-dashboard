import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { WeatherInfo } from "./model/weather-info";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class WeatherService {
  private WEATHER_SEARCH_URL =
    "https://api.openweathermap.org/data/2.5/weather?APPID=753a726cfdd055017e8392c06efaaeaf&units=metric&lang=en&q=";

  constructor(private http: HttpClient) {}

  /**
   * Get the current weather of city
   */
  getWeatherInfoByCityName(cityName: string) {
    return this.http
      .get<WeatherInfo>(this.WEATHER_SEARCH_URL + cityName)
      .pipe(catchError(this.handleError));
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    }
    // return an observable with a user-facing error message
    return throwError("Error code : " + error.status);
  }
}
