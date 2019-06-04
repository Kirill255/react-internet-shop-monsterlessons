import React from "react";
import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact render={() => <h1>Hello world</h1>} />
        <Route path="*" render={() => <h1>Not Found Page</h1>} />
      </Switch>
    </div>
  );
};

export default App;
