import React from "react";
import { Route, Switch } from "react-router-dom";

import pluginId from "../../pluginId";
import HomePage from "../HomePage";

const App = () => (
    <Switch>
        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
    </Switch>
);

export default App;
