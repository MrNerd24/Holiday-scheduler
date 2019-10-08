import React from 'react';
import styled from '@emotion/styled'
import {backgroundColor, sunnyColor} from "../palette";
import {DayData} from "../DAO/DAO";
import {colorSlide, RGBColorToString} from "../Utils/ColorUtils";
import Paper from '@material-ui/core/Paper';

const Container = styled(Paper)<{}>(({}) => ({
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr",
    gridTemplateColumns: "auto auto",
    backgroundColor: RGBColorToString(backgroundColor),
    top: -50,
    left: -100,
    width: 250,
    height: 150,
    position: "absolute",
    zIndex: 1,
    padding: 4,
}));

const Info = styled("p")<{}>(() => ({
    margin: 0,
    display: "flex",
    alignItems: "center",
    color: "black",
}));

const DayExpanded: React.FC<{ data: DayData}> = React.forwardRef(({data}, ref) => {
    return (
        <Container className="day-expanded-container" ref={ref}>
            <Info>Day temp: {Math.round(data.maxAirTemperature)}'C</Info>
            <Info>Wind: {data.windDirection}° {Math.round(data.windSpeed)}m/s</Info>
            <Info>Night temp: {Math.round(data.minAirTemperature)}'C</Info>
            <Info>Clouds: {data.clouds}/8</Info>
            <Info>Humidity: {Math.round(data.relativeHumidity)}%</Info>
            <Info>Rain: {Math.round(data.rainIntencity)}mm/h</Info>
        </Container>
    );
})



export default DayExpanded;