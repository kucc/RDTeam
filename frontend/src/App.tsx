import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Game from "./view/game";
import Main from "./view/main";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/play" exact component={Game} />
          <Route path="/" exact component={Main} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
