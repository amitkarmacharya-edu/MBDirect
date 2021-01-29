import React from "react";
import { Route, Switch } from "react-router-dom";
import { Category } from "./Category";
// import { AddEditCategory } from "./AddEditCategory";


function Categories({ match }) {
  const { path } = match;

  return (
    <div>      
      
        <Switch>
          <Route exact path={path} component={Category} />
          {/* <Route exact path={`${path}/add`} component={AddEditCategory} /> */}
          {/* <Route exact path={`${path}/edit/:id`} component={AddEditCategory} /> */}
        </Switch>
      
    </div>
  );
}

export { Categories };
