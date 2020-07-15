import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// ADMIN
import Auth from "pages/Admin/Auth";
import DashboardAdm from "pages/Admin/Dashboard";
import Welcome from "pages/Welcome";
import Product from "pages/Admin/Product";
import AddProduct from "pages/Admin/Product/Add";
import EditProduct from "pages/Admin/Product/Edit";
import Users from "pages/Admin/Users";
import AddUser from "pages/Admin/Users/Add";
import EditUser from "pages/Admin/Users/Edit";

//SV
import DashboardSupervisor from "pages/Supervisor/Dashboard";
//Sales
import DashboardSales from "pages/Sales/Dashboard";

export default function AppRoute() {
  return (
    <Router>
      <Switch>
        {/* HOME */}
        <Route exact path="/" component={Welcome} />
        {/* Router Admin */}
        <Route exact path="/admin/auth" component={Auth} />
        <Route exact path="/admin/dashboard" component={DashboardAdm} />
        {/* PRODUCT */}
        <Route exact path="/admin/product" component={Product} />
        <Route exact path="/admin/product/add" component={AddProduct} />
        <Route exact path="/admin/product/edit" component={EditProduct} />

        {/* USERS */}
        <Route exact path="/admin/users" component={Users} />
        <Route exact path="/admin/users/add" component={AddUser} />
        <Route exact path="/admin/users/edit" component={EditUser} />
        {/* Router Supervisor */}
        <Route exact path="/sv/dashboard" component={DashboardSupervisor} />
        {/* Router Sales */}
        <Route exact path="/sls/dashboard" component={DashboardSales} />
      </Switch>
    </Router>
  );
}
