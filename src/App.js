import React, { createContext } from "react";
import { createStore, StoreProvider } from "easy-peasy";
import Main from "./components/Main/Main";
import initStore from "./models/store";
import io from "socket.io-client";
import { Route, BrowserRouter, Redirect, useHistory, useParams, Link, Switch } from "react-router-dom";

import EventApply from "./components/Main/Eventsf/EventApply"
import EventUser from "./components/Main/Eventsf/EventUser"



const store = createStore(initStore);
export const SocketContext = React.createContext();


function App() {
  const socket = io.connect('/');
  console.log(localStorage.getItem("userapply"))
  return (
    <SocketContext.Provider value={socket}>
      <StoreProvider store={store}>




        <Main />


      </StoreProvider>
    </SocketContext.Provider>
  );
}

export default App;
