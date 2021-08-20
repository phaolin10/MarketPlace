import React from "react";
import { Grid, Form, Button, Container } from "semantic-ui-react";
import fetch from "isomorphic-fetch";
import { toast } from "react-toastify";
import "../../App.css";
import AdminNavbar from "./adminNavbar";
class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      inStock: "",
      description: "",
      price: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const { productName, inStock, description, price } = this.state;

    fetch("http://localhost:8080/api/product/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productName, inStock, description, price }),
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
        toast.success(`Product added.`);
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
                <label>Product Name</label>
                <Form.Input
                  type="text"
                  name="productName"
                  onChange={(event) => {
                    this.handleChange(event);
                  }}
                ></Form.Input>
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <Form.Input
                  type="text"
                  name="description"
                  onChange={(event) => {
                    this.handleChange(event);
                  }}
                ></Form.Input>
              </Form.Field>
              <Form.Field>
                <label>Stock</label>
                <Form.Input
                  type="text"
                  name="inStock"
                  onChange={(event) => {
                    this.handleChange(event);
                  }}
                ></Form.Input>
              </Form.Field>
              <Form.Field>
                <label>Price</label>
                <Form.Input
                  type="text"
                  name="price"
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

export default AddProduct;
