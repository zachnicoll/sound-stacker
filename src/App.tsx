import "./styles/index.css";
import { ThemeProvider, defaultTheme } from "evergreen-ui";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import { SoundStackProvider } from "./store";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/sound-stacker">
      <Route index element={<Home />} />
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider value={defaultTheme}>
      <SoundStackProvider>
        <RouterProvider router={router} />
      </SoundStackProvider>
    </ThemeProvider>
  );
}

export default App;
