import {Component, OnInit} from "angular2/core";
import {Profile} from "./profile";
import {ProfileService} from "./profile.service";
import {WeatherService} from "./weather/weather.service";
import {WeatherItem} from "./weather/weather-item";
import {Observable} from "rxjs/Observable";
@Component({
    selector: 'my-sidebar',
    template: `
        <h3>Saved Profiles</h3>
        <button (click)="onSaveNew()">Save List as Profile</button>
        <article *ngFor="#profile of profiles" class="profile" (click)="onLoadProfile(profile)">
            <h4>{{ profile.profileName }}</h4>
            <p>Cities: {{ profile.cities.join(', ') }}</p>
            <span class="delete" (click)="onDeleteProfile($event, profile)">X</span>
        </article>
    `,
    styleUrls: ['src/css/sidebar.css'],
    providers: [ProfileService]
})
export class SidebarComponent implements OnInit {
    profiles:Profile[];

    constructor(private _profileService:ProfileService, private _weatherService:WeatherService) {
    }

    onSaveNew() {
        const cities = this._weatherService.getWeatherItems().map(function (element) {
                return element.city;
            });
        this._profileService.saveNewProfile(cities);
    }

    onLoadProfile(profile: Profile) {
        this._weatherService.clearWeatherItems();
        for (let i = 0; i < profile.cities.length; i++) {
            this._weatherService.searchWeatherInfo(profile.cities[i])
                .retry()
                .subscribe(
                    data => {
                        const weatherItem = new WeatherItem(data.name + ', ' + data.sys.country, data.weather[0].main, +data.main.temp_min);
                        this._weatherService.addWeatherItem(weatherItem);
                    }
                );
        }
    }

    onDeleteProfile(event: Event, profile: Profile) {
        event.stopPropagation();
        this._profileService.deleteProfile(profile);
    }

    ngOnInit():any {
        this.profiles = this._profileService.getProfiles();
    }
}
