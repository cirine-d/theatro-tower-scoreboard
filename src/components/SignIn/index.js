import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";

import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { PasswordForgetLink } from "../PasswordForget";

const SignIn = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => this.setState({ error }));

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = email === "" || password === "";
    console.warn(this.state);
    return (
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form>
              <Form.Input
                onChange={this.onChange}
                icon="user"
                iconPosition="left"
                label="Email"
                name="email"
                placeholder="Email"
              />
              <Form.Input
                onChange={this.onChange}
                icon="lock"
                iconPosition="left"
                label="Password"
                name="password"
                type="password"
              />
              {error && <p>{error.message}</p>}
              <Button
                onClick={this.onSubmit}
                disabled={isInvalid}
                type="submit"
                content="Login"
                primary
              />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Button size="big">
              <SignUpLink />
            </Button>
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignIn;
