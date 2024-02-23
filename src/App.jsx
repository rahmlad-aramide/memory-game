import { useEffect, useState } from "react";
import { StartScreen, PlayScreen } from "./Screens";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [gameState, setGameState] = useState("start");
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
    AOS.refresh();
  });

  useEffect(()=> {
    if(theme === "dark"){
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme]);

  const handleSwitchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  switch (gameState) {
    case "start":
      return <StartScreen start={() => setGameState("play")} handleSwitchTheme={handleSwitchTheme} theme={theme} />;
    case "play":
      return <PlayScreen end={() => setGameState("start")} handleSwitchTheme={handleSwitchTheme} theme={theme} />;
    default:
      throw new Error("Invalid game state " + gameState);
  }
}

export default App;
