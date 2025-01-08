import { Provider } from "react-redux";
import { store } from "./store";
import AdminView from "./pages/AdminView";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/Header";

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
        <Header />
        <AdminView />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
