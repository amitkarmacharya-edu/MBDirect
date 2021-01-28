import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Container from "../../../components/Container";
import { User } from "./User";
import { AddEditUser } from "./AddEditUser";

function Users({ match }) {
  const { path } = match;

  return (
    <div>      
      <Container style={{ marginTop: 30 }}>
        <Switch>
          <Route exact path={path} component={User} />
          <Route exact path={`${path}/add`} component={AddEditUser} />
          <Route exact path={`${path}/edit/:id`} component={AddEditUser} />
        </Switch>
      </Container>
    </div>
  );
}

export { Users };
