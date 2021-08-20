import "./App.css";
import Login from "./components/login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./components/register";

import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import Dashboard from "./components/dashboard";
import Homepage from "./components/homepage";
import ProductTableForAdmin from "./components/productTable";
import FavlistDashboard from "./components/user/favlistdashboard";
import BlacklistDashboard from "./components/user/blacklistdashboard";
import SellerTableForUser from "./components/user/sellerTableForUser";
import UserTable from "./components/admin/userTableForAdmin";
import AddUser from "./components/admin/addUser";
import AddProduct from "./components/admin/addProduct";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login">
            <Login showRegisterLink></Login>
          </Route>

          <Route path="/dashboard">
            <Dashboard />
          </Route>

          <Route path="/adminboard">
            <ProductTableForAdmin />
          </Route>

          <Route path="/seller-table-for-user">
            <SellerTableForUser />
          </Route>

          <Route path="/user-table-for-admin">
            <UserTable />
          </Route>

          <Route path="/add-user">
            <AddUser />
          </Route>

          <Route path="/add-product">
            <AddProduct />
          </Route>

          <Route path="/favlistdashboard">
            <FavlistDashboard />
          </Route>

          <Route path="/blacklistdashboard">
            <BlacklistDashboard />
          </Route>

          <Route path="*">404 | Not Found</Route>
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
