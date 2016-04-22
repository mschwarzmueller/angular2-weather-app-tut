import {Component, OnInit} from "angular2/core";
import {ControlGroup} from "angular2/common";
import {WeatherService} from "./weather.service";
import {WeatherItem} from "./weather-item";
import {Subject} from "rxjs/Subject";
@Component({
    selector: 'weather-search',
    template: `
        <section class="weather-search">
            <form (ngSubmit)="onSubmit()">
                <label for="city">City</label>
                <input ngControl="location" type="text" id="city" (input)="onSearchLocation(input.value)" required #input>
                <button type="submit">Add City</button>
            </form>
            <div>
                <span class="info">City found:</span> {{data.name}}
            </div>
        </section>
    `
})
export class WeatherSearchComponent implements OnInit {
    private searchStream = new Subject<string>();
    data: any = {};

    constructor(private _weatherService:WeatherService) {
    }

    onSubmit() {
        const weatherItem = new WeatherItem(this.data.name, this.data.weather[0].description, this.data.main.temp);
        this._weatherService.addWeatherItem(weatherItem);

    }

    onSearchLocation(cityName:string) {
        this.searchStream
            .next(cityName);
    }

    ngOnInit() {
        this.searchStream
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap((input:string) => this._weatherService.searchWeatherData(input))
            .subscribe(
              data => this.data = data
            );
    }
}