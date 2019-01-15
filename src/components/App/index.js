import "./app.css";

import React from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import CreateBoard from "../CreateBoard";

import * as ROUTES from "../../constants/routes";
import { withAuthentification } from "../Session";

const App = () => (
  <Router>
    <div className="body">
      <div className="vertical-menu">
        <Navigation />
      </div>
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.CREATE_BOARD} component={CreateBoard} />
    </div>
  </Router>
);

export default withAuthentification(App);
