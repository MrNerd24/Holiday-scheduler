import React, {useCallback} from 'react';
import styled from '@emotion/styled'
import AddressField from "./AddressField";
import HolidayLengthSelector from "./HolidayLengthSelector";

const Container = styled('div')<{}>(() => ({
    display: "flex",
    flexDirection: "row",
    padding: "50px 200px 0 200px",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "wrap",
}));


const Toolbar: React.FC = () => {

    return (
        <Container className="Toolbar-container">
            <HolidayLengthSelector/>
            <AddressField/>
        </Container>
    );
}

export default Toolbar;