import React from "react";
import "./App.css";
import { AppRoutes } from "./AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { HttpApiServiceProvider } from "./services/Http.Api.service";

const App: React.FC = () => {
  return (
    <div className="App">
      <HttpApiServiceProvider>
        <Router>
          <AppRoutes />
        </Router>
      </HttpApiServiceProvider>
    </div>
  );
};

export default App;
