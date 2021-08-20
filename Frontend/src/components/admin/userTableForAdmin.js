import React from "react";
import {
  Container,
  Grid,
  Table,
  Icon,
  Menu,
  Label,
  Button,
  Form,
} from "semantic-ui-react";
import fetch from "isomorphic-fetch";
import { toast } from "react-toastify";
import "../../App.css";
import Navbar from "./adminNavbar";
// container - grid - margin-top
//react toastify
class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      id: "",
      role: "",
      users: {},
      currentPage: 0,
      trueEdit: false,
    };
  }

  componentDidMount = () => {
    this.getUsers();
  };

  getUsers = () => {
    const token = localStorage.getItem("token");
    fetch(
      "http://localhost:8080/api/user/get-all?" +
        new URLSearchParams({ pageNumber: this.state.currentPage }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    )
      .then((r) => {
        if (r.ok) {
          return r;
        }
        if (r.status === 401 || r.status === 403 || r.status === 500) {
          return Promise.reject(new Error("Bir hata oluştu"));
        }
        return Promise.reject(new Error("Bilinmeyen bir hata oluştu."));
      })
      .then((r) => r.json())
      .then((response) => {
        this.setState({ users: response });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  changePageTo = (i) => {
    this.setState({ currentPage: i }, this.getUsers);
  };

  deleteUser = (props) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const deletUserId = props;
    alert(deletUserId);
    fetch("http://localhost:8080/api/user/delete-user/" + deletUserId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
        toast.success(`Product deleted successfully.`);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { id, username, password, email, role } = this.state;
    const token = localStorage.getItem("token");
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
    } else {
      this.setState({
        passwordError: null,
        passwordRepeatError: null,
        emailError: null,
        roleError: null,
      });
    }

    fetch("http://localhost:8080/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, username, password, email, role }),
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
        toast.success(`User updated.`);
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
    const { users } = this.state;
    const pageArray = [...Array(users.totalPages).keys()];
    return (
      <Container>
        <Navbar />

        <Grid>
          <Grid.Column>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Index</Table.HeaderCell>
                  <Table.HeaderCell>Username</Table.HeaderCell>
                  <Table.HeaderCell>Roles</Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {users &&
                  users.content &&
                  users.content.map((value, index) => {
                    return (
                      <Table.Row>
                        <Table.Cell>
                          <Label ribbon>
                            {users.size * users.number + (index + 1)}
                          </Label>
                        </Table.Cell>
                        <Table.Cell>{value.username}</Table.Cell>
                        <Table.Cell>{value.roles.name}</Table.Cell>
                        <Table.Cell>
                          <Button
                            fluid
                            onClick={() => {
                              this.setState({
                                trueEdit: true,
                                id: value.id,
                              });
                            }}
                          >
                            <h5>Edit User</h5>
                            <Icon name="edit" />
                          </Button>
                        </Table.Cell>
                        <Table.Cell>
                          <Button
                            fluid
                            onClick={() => {
                              this.deleteUser(value.id);
                            }}
                          >
                            <h5>Delete User</h5>
                            <Icon name="trash" />
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="6">
                    <Menu floated="right" pagination>
                      <Menu.Item
                        onClick={() => {
                          this.changePageTo(this.state.currentPage - 1);
                        }}
                        as="a"
                        disabled={users.first}
                        icon
                      >
                        <Icon name="chevron left" />
                      </Menu.Item>
                      {pageArray.map((value, index) => {
                        return (
                          <Menu.Item
                            onClick={() => {
                              this.changePageTo(index);
                            }}
                            active={users.number === value}
                            as="a"
                          >
                            {value + 1}
                          </Menu.Item>
                        );
                      })}
                      <Menu.Item
                        onClick={() => {
                          this.changePageTo(this.state.currentPage + 1);
                        }}
                        as="a"
                        disabled={users.last}
                        icon
                      >
                        <Icon name="chevron right" />
                      </Menu.Item>
                    </Menu>
                    {this.state.trueEdit && (
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
                            required
                            value={this.state.password}
                            onChange={this.handleChange}
                          ></Form.Input>
                        </Form.Field>

                        <Form.Field>
                          <label>Role</label>
                          <Form.Input
                            type="text"
                            name="role"
                            required
                            value={this.state.role}
                            onChange={this.handleChange}
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
                    )}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default UserTable;
