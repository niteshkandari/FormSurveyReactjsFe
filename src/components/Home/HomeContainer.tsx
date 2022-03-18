import React from "react";
import Home from "./Home";
import { FacadeLayerProvider } from "../../facade/facade";

const HomeContainer = () => {
  return (
    <FacadeLayerProvider>
      <Home />
    </FacadeLayerProvider>
  );
};

export default HomeContainer;
