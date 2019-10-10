import React, {useEffect, useMemo, useState} from 'react';
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
    const [bestDays, setBestDays] = useState<boolean[]>([])

    useEffect(() => {
        if (location) {
            updateData(location[0], location[1], false)
        }
    }, [location])

    useEffect(() => {
        getBestVacationDays(data, durations).then((bestDays) => setBestDays(bestDays))
    }, [data, durations])

    return (
        <Container className="Calendars-container">
            {months.map((month) =>
                <Calendar key={month} month={month} data={data.filter((datum: DayData) => datum.month === month+1)} bestDays={bestDays} />
            )}
        </Container>
    );
}

export default Calendars;