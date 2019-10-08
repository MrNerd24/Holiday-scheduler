import React from 'react';
import styled from '@emotion/styled'
import {backgroundColor} from "../palette";
import {RGBColorToString} from "../Utils/ColorUtils";

const Container = styled('div')<{}>(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: RGBColorToString(backgroundColor),
    width: 50,
    height: 50,
}));

const DayName: React.FC<{dayName: String;}> = ({dayName}) => {


    return (
        <Container className="day-container">
            {dayName}
        </Container>
    );
}

export default DayName;