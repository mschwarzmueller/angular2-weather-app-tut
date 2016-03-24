import {Component, OnInit} from "angular2/core";
import {WeatherItemComponent} from "./weather-item.component";
import {WeatherItem} from "./weather-item";
import {WEATHER_ITEMS} from "./weather.data";
@Component({
    selector: 'weather-list',
    template: `
        <section class="weather-list">
            <weather-item *ngFor="#weatherItem of weatherItems" [item]="weatherItem"></weather-item>
        </section>
    `,
    directives: [WeatherItemComponent]
})
export class WeatherListComponent implements OnInit {
    weatherItems: WeatherItem[];

    ngOnInit():any {
        this.weatherItems = WEATHER_ITEMS;
    }
}