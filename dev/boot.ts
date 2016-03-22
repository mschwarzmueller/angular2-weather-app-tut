/// <reference path="../typings/browser.d.ts" />
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from "./app.component";
import {WeatherService} from "./weather/weather.service";
import {HTTP_PROVIDERS} from "angular2/http";

bootstrap(AppComponent, [WeatherService, HTTP_PROVIDERS]);
