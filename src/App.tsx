import React from 'react';
import Calendars from "./Calendars/Calendars";
import styled from "@emotion/styled";
import {backgroundColor, skyColor} from "./palette";
import Toolbar from "./Toolbar/Toolbar";
import {RGBColorToString} from "./Utils/ColorUtils";
import titleLogo from "./Images/titleLogo.png"


const Container = styled('div')<{}>(() => ({
    height: "100%",
    // backgroundColor: RGBColorToString(skyColor),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 50,
    overflow: "auto",
}));

const Logo = styled("img")<{}>(() => ({
}))

const App: React.FC = () => {
  return (
    <Container className="app-container">
        <Logo src={titleLogo}/>
        <Toolbar/>
        <Calendars/>
    </Container>
  );
}

export default App;
