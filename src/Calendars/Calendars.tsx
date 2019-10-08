import React, {useEffect, useMemo} from 'react';
import styled from '@emotion/styled'
import Calendar from "./Calendar";
import {dataSubject, DayData, updateData} from "../DAO/DAO";
import {useObservable} from "rxjs-hooks";
import {holidayLengthsSubject, userSelectedLocationSubject} from "../state";
import {getBestVacationDays} from "../Utils/VacationDaysSelector";

const Container = styled('div')<{}>(() => ({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 50,
    alignItems: "flex-start",
    justifyContent: "center",
}));

const Calendars: React.FC = () => {

    const months = [4,5,6,7,8]
    const data = useObservable(() => dataSubject, [])
    const location = useObservable(() => userSelectedLocationSubject)
    const durations = useObservable(() => holidayLengthsSubject, [])

    useEffect(() => {
        if (location) {
            updateData(location[0], location[1])
        }
    }, [location])

    const bestDays = useMemo(() => {
        return getBestVacationDays(data, durations)
    }, [data, durations])

    return (
        <Container className="Calendars-container">
            {months.map((month) =>
                <Calendar key={month} month={month} data={data.filter((datum: DayData) => datum.month === month)} bestDays={bestDays} />
            )}
        </Container>
    );
}

export default Calendars;