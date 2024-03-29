import React from "react";
import { Route, Switch } from "react-router-dom";

import Phones from "./components/Phones";
import Phone from "./components/Phone";
import Basket from "./components/Basket";

import withLayout from "./hoc/withLayout";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact render={withLayout(Phones)} />
        <Route path="/categories/:id" render={withLayout(Phones)} />
        <Route path="/phones/:id" component={Phone} />
        <Route path="/basket" component={Basket} />
        <Route path="*" render={() => <h1>Not Found Page</h1>} />
      </Switch>
    </div>
  );
};

export default App;
