import { useState } from "react";

// keeps track of state history and manages the transition between componenets

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  

  function transition (newMode, replace = false) {
    if (replace) {
      setMode(newMode);
    } else {
      setMode(newMode);
      setHistory([...history, newMode]);
      
  }
}

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    } else {
      setMode(mode);
    }
  }
  return {mode, transition, back};
};