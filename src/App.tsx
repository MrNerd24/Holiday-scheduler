import React from 'react';
import Calendars from "./Calendars/Calendars";
import styled from "@emotion/styled";
import Toolbar from "./Toolbar/Toolbar";
import titleLogo from "./Images/titleLogo.png"
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from "@material-ui/core";
import {lightGreen, yellow} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: { main: yellow[400] }, // Purple and green play nicely together.
        secondary: { main: lightGreen[500] }, // This is just green.A700 as hex.
    },
});

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
      <ThemeProvider theme={theme}>
          <Container className="app-container">
              <Logo src={titleLogo}/>
              <Toolbar/>
              <Calendars/>
          </Container>
      </ThemeProvider>

  );
}

export default App;
