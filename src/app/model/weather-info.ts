import {WeatherMain} from './weather-main.model';
import {Weather} from './weather.model';

export interface WeatherInfo {
  main: WeatherMain;
  weather: Weather[];
}