import {Component} from 'angular2/core';
import {WeatherItem} from "./weather-item";

@Component({
    selector: 'weather-item',
    template: `
        <article class="weather-element">
            <div class="col-1">
                <h3>{{ weatherItem.cityName }}</h3>
                <p class="info">{{ weatherItem.description }}</p>
            </div>
            <div class="col-2">
                <span class="temperature">{{ weatherItem.temperature }}°C</span>
            </div>
        </article>
    `,
    styleUrls: ['src/css/weather-item.css']
})
export class WeatherItemComponent {
    weatherItem: WeatherItem;

    constructor() {
        this.weatherItem = new WeatherItem('London', 'RAINY', 4);
    }
}