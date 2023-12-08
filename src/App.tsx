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

// const DEFAULT_SOURCES = [
//   // https://www.youtube.com/watch?v=4vIQON2fDWM
//   "4vIQON2fDWM",
//   // https://www.youtube.com/watch?v=FMxj-zHfZbw
//   "FMxj-zHfZbw",
//   // https://www.youtube.com/watch?v=Mm1FAYn8dOc
//   "Mm1FAYn8dOc",
// ];

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
