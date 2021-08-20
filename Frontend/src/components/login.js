import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Grid, Form, Button, Divider } from "semantic-ui-react";
import { toast } from "react-toastify";

import "../App.css";
const Login = ({ showRegisterLink, history }) => {
  const [usernamePassword, setUsernamePassword] = useState({
    username: "",
    password: "",
  });
  let username;
  let password;
  const [usernamePasswordError, setUsernamePasswordError] = useState({
    username,
    password,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUsernamePassword({ ...usernamePassword, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = usernamePassword;
    if (username.length < 5) {
      setUsernamePasswordError({
        ...usernamePasswordError,
        username: "Please enter an email with characters more than 3",
      });
      return;
    }
    if (password.length < 3) {
      setUsernamePasswordError({
        ...usernamePasswordError,
        password: "Please enter an password with characters more than 3",
      });
      return;
    }
    fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then(async (r) => {
        if (r.ok) {
          return r;
        }
        if (r.status === 401 || r.status === 403 || r.status === 500) {
          const result = await r.json();
          return Promise.reject(new Error(result.message));
        }
        return Promise.reject(new Error("Bilinmeyen bir hata"));
      })
      .then((r) => r.json())
      .then((response) => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.id);
        localStorage.setItem("role", response.roles);
        toast.success(`User with id ${response.token} added.
        You are being redirected to login page...`);
        if (response.roles == "ROLE_USER") {
          setTimeout(() => {
            history.push("/dashboard");
          }, 2000);
        }

        if (response.roles == "ROLE_ADMIN") {
          setTimeout(() => {
            history.push("/dashboard");
          }, 2000);
        }
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="App">
      <Grid columns="equal">
        <Grid.Column></Grid.Column>

        <Grid.Column>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Username</label>
              <Form.Input
                type="username"
                name="username"
                error={usernamePasswordError.username}
                required
                value={usernamePassword.username}
                onChange={handleChange}
              ></Form.Input>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Form.Input
                type="password"
                name="password"
                error={usernamePasswordError.password}
                required
                value={usernamePassword.password}
                onChange={handleChange}
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
          <Divider />
          {showRegisterLink && (
            <Link to="/register">You dont have an account? Please </Link>
          )}
        </Grid.Column>

        <Grid.Column></Grid.Column>
      </Grid>
    </div>
  );
};
export default withRouter(Login);
