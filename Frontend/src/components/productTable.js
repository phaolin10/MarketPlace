import React from "react";
import {
  Container,
  Grid,
  Table,
  Icon,
  Menu,
  Label,
  Form,
  Button,
} from "semantic-ui-react";
import fetch from "isomorphic-fetch";
import { toast } from "react-toastify";
import AdminNavbar from "./admin/adminNavbar";
import "../App.css";
import Navbar from "./user/navbar";
class ProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
      currentPage: 0,
      id: "",
      productName: "",
      description: "",
      inStock: "",
      price: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const { id, productName, description, inStock, price } = this.state;
    fetch("http://localhost:8080/api/product/update-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        productName,
        description,
        price,
        inStock,
      }),
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
        toast.success(`User with id ${response.username} added.
        You are being redirected to login page...`);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  componentDidMount = () => {
    this.getProducts();
  };

  getProducts = () => {
    const token = localStorage.getItem("token");
    fetch(
      "http://localhost:8080/api/product/get-all?" +
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
        this.setState({ products: response });
        toast.info(`${response.totalElements} fetched succesfully`);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  changePageTo = (i) => {
    this.setState({ currentPage: i }, this.getProducts);
  };

  deleteProduct = (props) => {
    const token = localStorage.getItem("token");
    const productId = props;
    fetch("http://localhost:8080/api/product/delete-product/" + productId, {
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

  addToFavouriteList = (props) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const productId = props;
    fetch("http://localhost:8080/api/favourite-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, userId }),
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
        toast.success(`Product added to fav list`);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  render() {
    const { products } = this.state;
    const pageArray = [...Array(products.totalPages).keys()];
    return (
      <Container>
        {this.props.userRole === "ROLE_USER" && <Navbar />}
        {this.props.userRole === "ROLE_ADMIN" && <AdminNavbar />}
        <Grid>
          <Grid.Column>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Index</Table.HeaderCell>
                  <Table.HeaderCell>Product Name</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Stock </Table.HeaderCell>
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {products &&
                  products.content &&
                  products.content.map((value, index) => {
                    return (
                      <Table.Row>
                        <Table.Cell>
                          <Label ribbon>
                            {products.size * products.number + (index + 1)}
                          </Label>
                        </Table.Cell>
                        <Table.Cell>{value.productName}</Table.Cell>
                        <Table.Cell>
                          <Icon></Icon>
                          {value.description}
                        </Table.Cell>
                        <Table.Cell>{value.price}</Table.Cell>
                        <Table.Cell>{value.inStock}</Table.Cell>

                        {this.props.userRole == "ROLE_ADMIN" && (
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
                              <h5>Edit Product</h5>
                              <Icon name="edit" />
                            </Button>
                          </Table.Cell>
                        )}
                        {this.props.userRole == "ROLE_ADMIN" && (
                          <Table.Cell>
                            <Button
                              fluid
                              onClick={() => {
                                this.deleteProduct(value.id);
                              }}
                            >
                              <h5>Delete Product</h5>
                              <Icon name="trash" />
                            </Button>
                          </Table.Cell>
                        )}

                        {this.props.userRole == "ROLE_USER" && (
                          <Table.Cell>
                            <Button
                              fluid
                              onClick={() => {
                                this.addToFavouriteList(value.id);
                              }}
                            >
                              <h5>Add to Favourite List</h5>
                              <Icon name="like" />
                            </Button>
                          </Table.Cell>
                        )}
                      </Table.Row>
                    );
                  })}
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="7">
                    <Menu floated="right" pagination>
                      <Menu.Item
                        onClick={() => {
                          this.changePageTo(this.state.currentPage - 1);
                        }}
                        as="a"
                        disabled={products.first}
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
                            active={products.number === value}
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
                        disabled={products.last}
                        icon
                      >
                        <Icon name="chevron right" />
                      </Menu.Item>
                    </Menu>

                    {this.state.trueEdit && (
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                          <label>Product name</label>
                          <Form.Input
                            onChange={this.handleChange}
                            type="text"
                            name="productName"
                            required
                          ></Form.Input>
                        </Form.Field>
                        <Form.Field>
                          <label>Description</label>
                          <Form.Input
                            onChange={this.handleChange}
                            type="text"
                            name="description"
                          ></Form.Input>
                        </Form.Field>
                        <Form.Field>
                          <label>Price</label>
                          <Form.Input
                            onChange={this.handleChange}
                            type="text"
                            name="price"
                          ></Form.Input>
                        </Form.Field>
                        <Form.Field>
                          <label>Stock</label>
                          <Form.Input
                            onChange={this.handleChange}
                            type="text"
                            name="inStock"
                          ></Form.Input>
                        </Form.Field>
                        <Form.Field></Form.Field>
                        <Grid textAlign="center">
                          <Grid.Column></Grid.Column>
                        </Grid>
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

export default ProductTable;
