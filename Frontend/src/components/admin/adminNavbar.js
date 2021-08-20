import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
// container - grid - margin-top
//react toastify
class AdminNavbar extends React.Component {
  render() {
    return (
      <Menu size="huge">
        <Menu.Item header>
          <Icon className="handshake outline" /> Online MarketPlace
        </Menu.Item>
        <Menu.Item name="Home" />
        <Menu.Item as={Link} to="/dashboard" name="Products" />
        <Menu.Item as={Link} to="/user-table-for-admin" name="Users" />
        <Menu.Item as={Link} to="/add-user" position="right">
          Add User
        </Menu.Item>
        <Menu.Item as={Link} to="/add-product">
          Add Product
        </Menu.Item>
      </Menu>
    );
  }
}

export default AdminNavbar;
