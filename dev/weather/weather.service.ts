import {WeatherItem} from "./weather-item";
import {WEATHER_ITEMS} from "./mock-weather";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {Injectable} from "angular2/core";
import {Http} from "angular2/http";

@Injectable()
export class WeatherService {

    constructor(private _http: Http) {}

    getWeatherItems() {
        return WEATHER_ITEMS;
    }
    
    addWeatherItem(item: WeatherItem) {
        WEATHER_ITEMS.push(item);
    }
    
    clearWeatherItems() {
        WEATHER_ITEMS.splice(0);
    }

    searchWeatherInfo(city: string): Observable<any> {
        
        return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=KEY8&units=metric')
            .map(
                response => response.json()
            )
            .catch(
                error => {
                    console.error(error);
                    return Observable.throw(error.json().error);
                }
            );
    }
}