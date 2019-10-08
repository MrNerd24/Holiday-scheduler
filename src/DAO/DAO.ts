import {fakeApiResult} from "./FakeApiResult";
import {BehaviorSubject} from "rxjs";

export interface DayData {
    month: number;
    date: number;
    clouds: number;
    airPressure: number;
    relativeHumidity: number;
    rainIntencity: number;
    snowDepth: number;
    maxAirTemperature: number;
    minAirTemperature: number;
    dewpointTemperature: number;
    visibility: number;
    windDirection: number;
    gustSpeed: number;
    windSpeed: number;
    score: number;
}

export const dataSubject = new BehaviorSubject<DayData[]>([])

export const updateData = (lat: number, long: number, isFake=true) => {
    if(isFake) {
        dataSubject.next(fakeApiResult)
    }
}