import React from "react";
import { IconButton, Container } from "@mui/material"; // Import Material-UI components
import Create from "./CRUD/Create";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Read from "./CRUD/Read";
import Update from "./CRUD/Update";
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  return (
    <Container
      sx={{
        display: "flex",
        width: "100%",
        // height: "100%",
        height: "100vh",
        marginLeft: "0px",
        marginRight: "0px",
        // alignItems: "center",
        // justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        // borderRadius: 1,
        // p: 3,
      }}
    >
      <Create />
      <Read />
    </Container>
  );
}

const App = () => {
  const [mode, setMode] = React.useState("light"); // Fix the initialization of state
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [] // Remove the empty dependency array since setMode is a dependency
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <Box
      width="100%"
      // display="flex"
      // border="5px solid red"
      backgroundColor="#333545"
    >
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Box>
            {theme.palette.mode} mode
            <IconButton
              sx={{}}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Box>
          <Box>
            <MyApp />
            <Update />
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Box>
  );
};

export default App;
