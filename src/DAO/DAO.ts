import {fakeApiResult} from "./FakeApiResult";
import {BehaviorSubject} from "rxjs";
import Predictions from "./Predictions.json";

export interface DayData {
    year: number;
    month: number;
    day: number;
    clouds?: number;
    airPressure?: number;
    relativeHumidity?: number;
    rainIntencity?: number;
    snowDepth?: number;
    maxAirTemperature?: number;
    minAirTemperature?: number;
    maxDewpointTemperature?: number;
    minDewpointTemperature?: number;
    visibility?: number;
    windDirection?: number;
    gustSpeed?: number;
    windSpeed?: number;
    score?: number;
}

export interface StationData {
    Name: string;
    Lat: number;
    Lon: number;
    Altitude: number;
    Group: string;
    Since: number;
    Predictions: DayData[];
}

export const dataSubject = new BehaviorSubject<DayData[]>([])

export const updateData = (lat: number, long: number, isFake=true) => {
    if(isFake) {
        dataSubject.next(fakeApiResult)
        return
    }

    const predictions = Predictions as StationData[]

    const closestPrediction = predictions.reduce((closest: StationData, current: StationData) => {
        const closestDist = Math.sqrt(Math.pow(lat-closest.Lat, 2) + Math.pow(long-closest.Lon,2))
        const currentDist = Math.sqrt(Math.pow(lat-current.Lat, 2) + Math.pow(long-current.Lon,2))
        if (currentDist < closestDist) {
            return current
        } else {
            return closest
        }
    }, predictions[0])

    console.log("closest station: ", closestPrediction.Name)

    dataSubject.next(closestPrediction.Predictions)
}