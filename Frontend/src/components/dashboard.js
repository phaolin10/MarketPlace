import React from "react";
import { Container } from "semantic-ui-react";
import "../App.css";
import ProductTableForAdmin from "./productTable";
// container - grid - margin-top
//react toastify
class Dashboard extends React.Component {
  render() {
    const userRole = localStorage.getItem("role");

    return (
      <Container>
        {userRole === "ROLE_USER" && (
          <ProductTableForAdmin userRole={userRole} />
        )}

        {userRole === "ROLE_ADMIN" && (
          <ProductTableForAdmin userRole={userRole} />
        )}
      </Container>
    );
  }
}

export default Dashboard;
