import React, {useCallback} from 'react';
import styled from '@emotion/styled'
import AddressField from "./AddressField";
import {useObservable} from "rxjs-hooks";
import {holidayLengthsSubject} from "../state";
import HolidayBadge from "./HolidayBadge";
import Button from '@material-ui/core/Button'

const Container = styled('div')<{}>(() => ({
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
}));

const AddButton = styled(Button)<{}>(() => ({
    flexShrink: 0,
}))


const HolidayLengthSelector: React.FC = () => {

    const holidayLengths = useObservable(() => holidayLengthsSubject, [])
    const onAddButtonClick = useCallback(() => {
        holidayLengthsSubject.next([...holidayLengths, 0])
    }, [holidayLengths])

    const onHolidayBadgeChange = useCallback((length: number, index: number) => {
        holidayLengthsSubject.next(holidayLengths.map((value, i) => i === index ? length : value))
    }, [holidayLengths])

    const onHolidayBadgeRemove = useCallback((index: number) => {
        holidayLengthsSubject.next(holidayLengths.filter((value, i) => i !== index))
    }, [holidayLengths])

    return (
        <Container className="holiday-selector-container">
            <AddButton variant="contained" color="primary" onClick={onAddButtonClick} disabled={holidayLengths.length > 3}>Add holiday</AddButton>
            {holidayLengths && holidayLengths.map((length, index) => (
                <HolidayBadge key={index} length={length} index={index} onChange={onHolidayBadgeChange} onRemove={onHolidayBadgeRemove}/>
            ))}

        </Container>
    );
}

export default HolidayLengthSelector;