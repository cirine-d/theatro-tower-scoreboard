import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Button, Form, Segment } from "semantic-ui-react";

import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";

const PasswordForget = () => (
  <div>
    <h1>Reset Password</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <Segment placeholder>
        <Form>
          <Form.Input
            onChange={this.onChange}
            icon="user"
            iconPosition="left"
            label="Email"
            name="email"
            placeholder="Email"
          />
          <Button
            onClick={this.onSubmit}
            disabled={isInvalid}
            type="submit"
            content="Reset Password"
            primary
          />
          {error && <p>{error.message}</p>}
        </Form>
      </Segment>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForget;

export { PasswordForgetForm, PasswordForgetLink };
