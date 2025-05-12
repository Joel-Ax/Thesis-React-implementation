// App.tsx
import React from "react";
import { HashRouter as Router } from "react-router-dom";
import AppRouter from "./router/index";
import "./assets/index.css";
import { BakeryProvider } from "./components/context/BakeryContext";
import useInactivityDetection from "./components/hooks/useInactivityDetection";
import InactivtyDialog from "./components/modals/InactivityDialog";

const App: React.FC = () => {
  const { isActive, resumeActivity } = useInactivityDetection({
    inactivityTimeout: 10000,
    deadBandTime: 100,
  });

  return (
    <BakeryProvider>
      <Router>
        <AppRouter />
      </Router>
      <InactivtyDialog show={!isActive} onResume={resumeActivity} />
    </BakeryProvider>
  );
};

export default App;
