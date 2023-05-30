import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { Container, Box } from "@mui/material";
import { Register } from "./components/Register";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "background.paper",
            overflow: "hidden",
            borderRadius: "12px",
            boxShadow: 1,
            minHeight: "100vh",
          }}
        >
          <Register />
        </Box>
      </Container>
      {/* Other components go here */}
    </ThemeProvider>
  );
}

export default App;
