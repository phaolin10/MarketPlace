import React from "react";
import {
  Container,
  Grid,
  Table,
  Icon,
  Menu,
  Label,
  Button,
  Tab,
} from "semantic-ui-react";
import fetch from "isomorphic-fetch";
import { toast } from "react-toastify";
import "../../App.css";
import Navbar from "./navbar";
class SellerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  addToBlackList = (props) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userBlackId = props;
    fetch("http://localhost:8080/api/blacklist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userBlackId, userId }),
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
        toast.success(`User added to black list.`);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  changePageTo = (i) => {
    this.setState({ currentPage: i }, this.getUsers);
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
                  <Table.HeaderCell>Products</Table.HeaderCell>
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
                        <Table.Cell>
                          <Icon></Icon>
                          {value.description}
                        </Table.Cell>
                        <Table.Cell>
                          <Button
                            fluid
                            onClick={() => {
                              this.addToBlackList(value.id);
                            }}
                          >
                            <h5>Add to BlackList</h5>
                            <Icon name="ban" />
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

export default SellerTable;
