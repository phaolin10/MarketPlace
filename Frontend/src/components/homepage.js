import React from "react";
import {
  Container,
  Icon,
  Header,
  Button,
  Divider,
  Grid,
  Segment,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import Navbar from "./user/navbar";
// container - grid - margin-top
//react toastify
class Homepage extends React.Component {
  render() {
    return (
      <Container>
        <Navbar />

        <Segment placeholder>
          <Header icon>
            <Icon name="shipping" />
            <h2>Welcome to MarketPlace</h2>
            <h3>You can shop freely</h3>
          </Header>
        </Segment>

        <Segment placeholder>
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical>Or</Divider>

            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header icon>
                  <Icon name="sign in" />
                  Sign in
                </Header>

                <Button as={Link} to="/login">
                  Sign in
                </Button>
              </Grid.Column>

              <Grid.Column>
                <Header icon>
                  <Icon name="signup" />
                  Sign up
                </Header>
                <Button as={Link} to="/register" primary>
                  Create
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default withRouter(Homepage);
