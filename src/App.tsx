import { Container, MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <>
      <MantineProvider
        theme={{ colorScheme: "dark" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Container sx={{ minHeight: "100vh" }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </MantineProvider>
    </>
  );
}

export default App;
