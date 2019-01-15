import React from "react";
import { Link } from "react-router-dom";

import { Menu } from "semantic-ui-react";

import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import SignOut from "../SignOut";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <Menu pointing secondary vertical>
    <Menu.Item name="landing">
      <Link to={ROUTES.LANDING}>Landing</Link>
    </Menu.Item>
    <Menu.Item name="home">
      <Link to={ROUTES.HOME}>Home</Link>
    </Menu.Item>
    <Menu.Item name="account">
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </Menu.Item>
    <Menu.Item name="admin">
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </Menu.Item>
    <Menu.Item name="create board">
      <Link to={ROUTES.CREATE_BOARD}>Create Board</Link>
    </Menu.Item>
    <SignOut />
  </Menu>
);

const NavigationNonAuth = () => (
  <Menu pointing secondary vertical>
    <Menu.Item name="landing">
      <Link to={ROUTES.LANDING}>Landing</Link>
    </Menu.Item>
    <Menu.Item name="sign in">
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </Menu.Item>
  </Menu>
);

export default Navigation;
