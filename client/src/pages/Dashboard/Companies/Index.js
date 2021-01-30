import React from "react";
import { Route, Switch } from "react-router-dom";
import { Company } from "./Company";
import { AddEditCompany } from "./AddEditCompany";


function Companies({ match }) {
  const { path } = match;

  return (
    <div>      
      
        <Switch>
          <Route exact path={path} component={Company} />
          <Route exact path={`${path}/add`} component={AddEditCompany} />
          <Route exact path={`${path}/edit/:id`} component={AddEditCompany} />
        </Switch>
      
    </div>
  );
}

export { Companies };
