import React from "react";
import { Route, Switch } from "react-router-dom";
import { Meet } from "./Meet";
// import { AddEditMeet } from "./AddEditMeet";

function Meets({ match }) {
  const { path } = match;

  return (
    <div>      
      
        <Switch>
          <Route exact path={path} component={Meet} />
          {/* <Route exact path={`${path}/add`} component={AddEditMeet} /> */}
          {/* <Route exact path={`${path}/edit/:id`} component={AddEditMeet} /> */}
        </Switch>
      
    </div>
  );
}

export { Meets };
