import React from 'react';
import styled from '@emotion/styled'
import Paper from "@material-ui/core/Paper/Paper";
import TextField from "@material-ui/core/TextField/TextField";
import DeleteIcon from '@material-ui/icons/Delete';


const Container = styled(Paper)<{}>(() => ({
    display: "flex",
    flexDirection: "row",
    padding: 4,
    alignItems: "center",
    marginLeft: 16,
    flexShrink: 0,
}));

const DaysInput = styled(TextField)<{}>(() => ({
    width: 50,
}))

const RemoveButton = styled(DeleteIcon)<{}>(() => ({
    cursor: "pointer",
    marginLeft: 4,
}))

const DaysText = styled("p")<{}>(() => ({
    margin: 0,
    marginRight: 4,
}))

const HolidayBadge: React.FC<{length: number, index: number, onChange: (length: number, index: number) => void, onRemove: (index: number) => void}> = ({length, onChange, index, onRemove}) => {

    return (
        <Container className="holiday-selector-container">
            <DaysText>Days:</DaysText>
            <DaysInput value={length || ""} type="number" placeholder="days" onChange={(event) => onChange(parseInt(event.target.value), index)}/>
            <RemoveButton onClick={() => onRemove(index)}/>
        </Container>
    );
}

export default HolidayBadge;