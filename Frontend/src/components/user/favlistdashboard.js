import React from "react";
import { Container, Grid, Table, Icon, Label, Button } from "semantic-ui-react";
import fetch from "isomorphic-fetch";
import { toast } from "react-toastify";
import Navbar from "./navbar";
import "../../App.css";
class Favlistdashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
      currentPage: 0,
      trueEdit: false,
    };
  }

  componentDidMount = () => {
    this.getProducts();
  };

  getProducts = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    fetch(
      "http://localhost:8080/api/favourite-list?" +
        new URLSearchParams({ userId: userId }),
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
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  removeToFavouriteList = (props, history) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const productId = props;
    fetch("http://localhost:8080/api/favourite-list/delete", {
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
        toast.success(`Product remove to favourite list successfully.`);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  render() {
    const { products } = this.state;
    return (
      <Container>
        <Navbar />

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
                {products.productsFavList &&
                  products.productsFavList &&
                  products.productsFavList.map((value, index) => {
                    return (
                      <Table.Row>
                        <Table.Cell>
                          <Label ribbon>{index + 1}</Label>
                        </Table.Cell>
                        <Table.Cell>{value.productName}</Table.Cell>
                        <Table.Cell>
                          <Icon></Icon>
                          {value.description}
                        </Table.Cell>
                        <Table.Cell>{value.price}</Table.Cell>
                        <Table.Cell>{value.inStock}</Table.Cell>
                        <Table.Cell>
                          <Button
                            fluid
                            onClick={() => {
                              this.setState({
                                trueEdit: true,
                              });
                              this.removeToFavouriteList(value.id);
                            }}
                          >
                            <h5>Remove to Favourite List</h5>
                            <Icon name="trash" />
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="7"></Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Favlistdashboard;
