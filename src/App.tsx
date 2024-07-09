import "./App.css";
import { ThemeProvider } from "./components/theme-provider/theme-provider";
import { ThemeToggle } from "./components/theme-provider/theme-toggle";
import { Discover } from "./components/discover/discover";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ThemeToggle />
      <Discover />
    </ThemeProvider>
  );
}

export default App;
