import {DayData} from "./DAO";

const startDate = new Date(2019, 4, 1)

const getRandomInteger = (start: number, end:number) => {
    return Math.floor(Math.random() * (end-start)) + start
}

const getRandomFloat = (start: number, end:number) => {
    return Math.random() * (end-start) + start
}


export const fakeApiResult: DayData[] = Array.from({length: 153}, (v, k) => {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + k)
    return {
        month: date.getMonth(),
        date: date.getDate(),
        clouds: getRandomInteger(1,8),
        airPressure: getRandomFloat(900, 1100),
        relativeHumidity: getRandomFloat(60, 100),
        rainIntencity: getRandomFloat(0, 2),
        snowDepth: 0,
        maxAirTemperature: getRandomFloat(10,30),
        minAirTemperature: getRandomFloat(0,20),
        dewpointTemperature: getRandomFloat(0, 15),
        visibility: getRandomFloat(10000, 100000),
        windDirection: getRandomInteger(0,360),
        gustSpeed: getRandomFloat(0, 10),
        windSpeed: getRandomFloat(0, 10),
        score: getRandomFloat(0,1),
    }

});