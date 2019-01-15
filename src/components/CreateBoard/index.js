import React, { Component } from "react";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROUTES from "../../constants/routes";

const CreateBoard = () => (
  <div>
    <h1>Create Scoreboard</h1>
    <CreateBoardForm />
  </div>
);

const INITIAL_STATE = {
  title: "",
  author: "",
  users: [],
  allUsers: [],
  error: null,
  loading: false
};

class CreateBoardFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        allUsers: usersList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  onSubmit = event => {
    const { author, users } = this.state;

    this.props.firebase
      .then(title => {
        return this.props.firebase.board(title).set({ title, author, users });
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
    const { title, users, allUsers, error } = this.state;

    const isInvalid = title === "";
    console.warn(this.state);
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="title"
          value={title}
          onChange={this.onChange}
          type="text"
          placeholder="Title"
        />
        <select multiple={true} name="users" size={allUsers.length}>
          {allUsers.map(user => (
            <option key={user.uid} value={user.uid}>
              {user.username}
            </option>
          ))}
        </select>
        <button disabled={isInvalid} type="submit">
          Create
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const condition = authUser => !!authUser;

const CreateBoardForm = withAuthorization(condition)(
  withFirebase(CreateBoardFormBase)
);

export default CreateBoard;
