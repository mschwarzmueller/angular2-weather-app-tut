import {Component, OnInit} from "angular2/core";
import {WeatherService} from "./weather.service";
import {Subject} from "rxjs/Subject";
import {WeatherItem} from "./weather-item";
@Component({
    selector: 'weather-search',
    template: `
        <section class="weather-search">
            <form #f="ngForm" (ngSubmit)="onSubmit()">
                <label for="city">City</label>
                <input ngControl="location" type="text" id="city" (input)="onSearchLocation(input.value)" #input required>
                <button type="submit">Add City</button>
            </form>
            <div>
                <span class="info">City found:</span> {{ data.name }} {{ data.sys?.country }}
            </div>
        </section>
    `
})
export class WeatherSearchComponent implements OnInit {
    private searchStream = new Subject<string>();
    data:any = {};

    constructor(private _weatherService:WeatherService) {
    }

    onSearchLocation(value:string) {
        this.searchStream
            .next(value);
    }

    onSubmit() {
        const newItem = new WeatherItem(this.data.name + ', ' + this.data.sys.country, this.data.weather[0].main, +this.data.main.temp_min);
        this._weatherService.addWeatherItem(newItem);
    }

    ngOnInit():any {
        this.searchStream
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap((term:string) => this._weatherService.searchWeatherInfo(term))
            .subscribe(
                data => this.data = data
            );
    }
}