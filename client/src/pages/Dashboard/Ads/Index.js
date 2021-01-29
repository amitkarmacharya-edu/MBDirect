import React from "react";
import { Route, Switch } from "react-router-dom";
import { Ad } from "./Ad";
// import { AddEditAd } from "./AddEditAd";


function Ads({ match }) {
  const { path } = match;

  return (
    <div>      
      
        <Switch>
          <Route exact path={path} component={Ad} />
          {/* <Route exact path={`${path}/add`} component={AddEditAd} /> */}
          {/* <Route exact path={`${path}/edit/:id`} component={AddEditAd} /> */}
        </Switch>
      
    </div>
  );
}

export { Ads };
