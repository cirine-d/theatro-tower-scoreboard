import React from "react";

import { Button } from "semantic-ui-react";

import { withFirebase } from "../Firebase";

const SignOut = ({ firebase }) => (
  <Button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOut);
