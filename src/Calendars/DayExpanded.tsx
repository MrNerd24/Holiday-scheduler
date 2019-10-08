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
    top: -60,
    left: -120,
    width: 300,
    height: 180,
    position: "absolute",
    zIndex: 1,
    padding: 8,

    ":after": {
        top: "100%",
        left: "50%",
        border: "solid transparent",
        content: "\"\"",
        height: 0,
        width: 0,
        position: "absolute",
        pointerEvents: "none",
        borderColor: "rgba(255, 255, 255, 0)",
        borderTopColor: "#ffffff",
        borderWidth: 5,
        marginLeft: -5,
    },

    ":before": {
        top: "100%",
        left: "50%",
        border: "solid transparent",
        content: "\"\"",
        height: 0,
        width: 0,
        position: "absolute",
        pointerEvents: "none",
        borderColor: "rgba(255, 255, 255, 0)",
        borderTopColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 6,
        marginLeft: -6,
    }
}));

const Info = styled("p")<{}>(() => ({
    margin: 0,
    display: "flex",
    alignItems: "center",
    color: "black",
}));

const DayExpanded: React.FC<{ data: DayData}> = React.forwardRef(({data}, ref) => {
    return (
        <Container className="day-expanded-container" ref={ref} elevation={10}>
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