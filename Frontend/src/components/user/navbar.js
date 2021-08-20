import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
// container - grid - margin-top
//react toastify
class Navbar extends React.Component {
  render() {
    return (
      <Menu size="huge">
        <Menu.Item header>
          <Icon className="handshake outline" /> Online MarketPlace
        </Menu.Item>
        <Menu.Item name="Home" />
        <Menu.Item as={Link} to="/dashboard" name="Products" />
        <Menu.Item as={Link} to="/seller-table-for-user" name="Sellers" />
        <Menu.Item
          as={Link}
          to="/favlistdashboard"
          position="right"
          name="Favourite List"
        />
        <Menu.Item as={Link} to="/blacklistdashboard" name="BlackList" />
      </Menu>
    );
  }
}

export default Navbar;
