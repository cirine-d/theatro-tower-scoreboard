import React, { Component } from "react";

import { Button, Form, Segment } from "semantic-ui-react";

import { withFirebase } from "../Firebase";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <Segment placeholder>
        <Form>
          <Form.Input
            onChange={this.onChange}
            icon="lock"
            iconPosition="left"
            label="Password"
            type="password"
            name="passwordOne"
            value={passwordOne}
            placeholder="New Password"
          />
          <Form.Input
            onChange={this.onChange}
            icon="lock"
            iconPosition="left"
            label="Password"
            type="password"
            name="passwordTwo"
            value={passwordTwo}
            placeholder="Confirm New Password"
          />
          {error && <p>{error.message}</p>}
          <Button
            onClick={this.onSubmit}
            disabled={isInvalid}
            type="submit"
            content="Confirm Change"
            primary
          />
        </Form>
      </Segment>
    );
  }
}

export default withFirebase(PasswordChangeForm);
