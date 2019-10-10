import React from 'react';
import styled from '@emotion/styled'
import Day from "./Day";
import DayName from "./DayName";
import {backgroundColor, borderColor} from "../palette";
import {DayData} from "../DAO/DAO";
import {RGBColorToString} from "../Utils/ColorUtils";
import Paper from '@material-ui/core/Paper';

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const MonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const Container = styled(Paper)<{}>(() => ({
    marginTop: 24,
    marginRight: 24,
    overflow: "hidden",

    "&&": {
        backgroundColor: RGBColorToString(borderColor),
    }
}));

const GridContainer = styled('div')<{}>(() => ({
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridTemplateRows: "repeat(6, 1fr)",
    gridRowGap: 1,
    gridColumnGap: 1,
}));

const MonthName = styled("h3")<{}>(() => ({
    margin: 0,
    backgroundColor: RGBColorToString(backgroundColor),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderBottom: "1px solid " + RGBColorToString(borderColor)
}))

const Calendar: React.FC<{month: number, data: DayData[], bestDays: boolean[]}> = ({month, data, bestDays}) => {
    const numberOfDays = new Date(new Date().getFullYear(), month+1, 0).getDate()
    const firstDate = new Date(new Date().getFullYear(), month, 1)
    let firstDay = firstDate.getDay()-1
    firstDay = ((firstDay%7) + 7)%7

    let days = Array.from({length: numberOfDays}, (v, k) => k+1);
    const emptyDaysPaddingFront = Array.from({length: firstDay}, (v, k) => 0);
    days = emptyDaysPaddingFront.concat(days)
    const emptyDaysPaddingBack = Array.from({length: 42-days.length >= 7 ? 42-days.length -7 : 42-days.length}, (v, k) => 0);
    days = days.concat(emptyDaysPaddingBack)


    let bestDaysStartingPosition = (new Date(2019, month, 1).getTime() - new Date(2019, 4, 1).getTime())/(1000*60*60*24)
    bestDays = bestDays.slice(bestDaysStartingPosition, bestDaysStartingPosition+numberOfDays)

    return (
        <Container className="Calendar-container" elevation={3}>
            <MonthName>
                {MonthNames[month]}
            </MonthName>
            <GridContainer>
                {dayNames.map((dayName) => (
                    <DayName key={dayName} dayName={dayName}/>
                ))}
                {days.map((day, index) => (
                    <Day key={index} dayNum={day} index={index} data={data.find((datum) => datum.day === day)} isBestDay={day === 0 ? false : bestDays[day-1]} />
                ))}
            </GridContainer>

        </Container>
    );
}

export default Calendar;