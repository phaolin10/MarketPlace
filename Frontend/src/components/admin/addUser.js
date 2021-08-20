import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Grid, Form, Button, Divider, Container } from "semantic-ui-react";
import fetch from "isomorphic-fetch";
import { toast } from "react-toastify";
import "../../App.css";
import AdminNavbar from "./adminNavbar";
class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordRepeat: "",
      email: "",
      role: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password, passwordRepeat, email } = this.state;
    if (username.length < 3) {
      this.setState({
        usernameError: "Please enter an username with characters more than 3",
      });
      return;
    }
    if (email.length < 5) {
      this.setState({
        mailError: "Please enter an mail with characters more than 5",
      });
      return;
    }
    if (password.length < 3) {
      this.setState({
        passwordError: "Please enter an password with characters more than 3",
      });
      return;
    }
    if (password !== passwordRepeat) {
      this.setState({
        passwordError: "Please make sure that passwords match",
        passwordRepeatError: "Please make sure that passwords match",
      });
      return;
    } else {
      this.setState({
        passwordError: null,
        passwordRepeatError: null,
        emailError: null,
        roleError: null,
      });
    }

    fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    })
      .then(async (r) => {
        if (r.ok) {
          return r;
        }
        if (r.status === 401 || r.status === 403 || r.status === 500) {
          const result = await r.json();
          return Promise.reject(new Error(result.message));
        }
        return Promise.reject(new Error("Bilinemeyn bir hata"));
      })
      .then((r) => r.json())
      .then((response) => {
        toast.success(`User with username ${response.username} added.`);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Container>
        <AdminNavbar />
        <Grid columns="equal">
          <Grid.Column></Grid.Column>

          <Grid.Column>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Username</label>
                <Form.Input
                  type="username"
                  name="username"
                  error={this.state.usernameError}
                  required
                  value={this.state.username}
                  onChange={this.handleChange}
                ></Form.Input>
              </Form.Field>
              <Form.Field>
                <label>Mail</label>
                <Form.Input
                  type="email"
                  name="email"
                  error={this.state.emailError}
                  required
                  value={this.state.email}
                  onChange={this.handleChange}
                ></Form.Input>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <Form.Input
                  type="password"
                  name="password"
                  error={this.state.passwordError}
                  required
                  value={this.state.password}
                  onChange={(event) => {
                    this.handleChange(event);
                  }}
                ></Form.Input>
              </Form.Field>
              <Form.Field>
                <label>Repeat Password</label>
                <Form.Input
                  type="password"
                  name="passwordRepeat"
                  error={this.state.passwordRepeatError}
                  required
                  value={this.state.passwordRepeat}
                  onChange={(event) => {
                    this.handleChange(event);
                  }}
                ></Form.Input>
              </Form.Field>
              <Form.Field>
                <label>Role</label>
                <Form.Input
                  type="text"
                  name="role"
                  required
                  value={this.state.role}
                  onChange={(event) => {
                    this.handleChange(event);
                  }}
                ></Form.Input>
              </Form.Field>
              <Form.Field></Form.Field>
              <Grid textAlign="center">
                <Grid.Column>
                  <Button fluid type="submit">
                    Submit
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          </Grid.Column>

          <Grid.Column></Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default AddUser;
