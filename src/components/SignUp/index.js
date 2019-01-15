import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { Button, Form, Segment } from "semantic-ui-react";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignUp = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const SignUpLink = () => (
  <Link to={ROUTES.SIGN_UP}>
    {" "}
    <Button content="Sign up" icon="signup" size="big" />
  </Link>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({ username, email });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <Segment placeholder>
        <Form>
          <Form.Input
            icon="user"
            iconPosition="left"
            label="Name"
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Name"
          />
          <Form.Input
            onChange={this.onChange}
            icon="email"
            iconPosition="left"
            label="Email"
            name="email"
            placeholder="Email"
            value={email}
            type="text"
          />
          <Form.Input
            onChange={this.onChange}
            icon="lock"
            iconPosition="left"
            label="Password"
            type="password"
            name="passwordOne"
            value={passwordOne}
            placeholder="Password"
          />
          <Form.Input
            onChange={this.onChange}
            icon="lock"
            iconPosition="left"
            label="Password"
            type="password"
            name="passwordTwo"
            value={passwordTwo}
            placeholder="Confirm Password"
          />
          {error && <p>{error.message}</p>}
          <Button
            onClick={this.onSubmit}
            disabled={isInvalid}
            type="submit"
            content="Sign Up"
            primary
          />
        </Form>
      </Segment>
    );
  }
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUp;

export { SignUpForm, SignUpLink };
