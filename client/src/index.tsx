import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./router/ScrollToTop";
import StoreMOBX from "./store/store";

interface State {
  storeMOBX: StoreMOBX;
}

const storeMOBX = new StoreMOBX();

export const Context = createContext<State>({
  storeMOBX,
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
        <Context.Provider value={{
          storeMOBX
        }}>
          <App />
        </Context.Provider> 
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
