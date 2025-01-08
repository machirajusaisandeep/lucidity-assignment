import { Provider } from "react-redux";
import { store } from "./store";
import AdminView from "./pages/AdminView";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AdminView />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
