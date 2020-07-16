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
import Apotik from "pages/Admin/Apotik";
import AddApotik from "pages/Admin/Apotik/Add";
import EditApotik from "pages/Admin/Apotik/Edit";
import Chat from "pages/Admin/Chat";
import Order from "pages/Admin/Order";

//SV
import DashboardSupervisor from "pages/Supervisor/Dashboard";
//Sales
import DashboardSales from "pages/Sales/Dashboard";
import AuthClient from "pages/AuthClient";
import Detail from "pages/Admin/Order/Detail";

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
        {/* APOTIK */}
        <Route exact path="/admin/apotik" component={Apotik} />
        <Route exact path="/admin/apotik/add" component={AddApotik} />
        <Route exact path="/admin/apotik/edit" component={EditApotik} />
        {/* CHAT */}
        <Route exact path="/admin/chat" component={Chat} />
        {/* ORDER */}
        <Route exact path="/admin/order" component={Order} />
        <Route exact path="/admin/order/detail" component={Detail} />

        {/* AUTH */}
        <Route exact path="/auth" component={AuthClient} />
        {/* Router Supervisor */}
        <Route exact path="/supervisor/dashboard" component={DashboardSupervisor} />

        {/* Router Sales */}
        <Route exact path="/sales/dashboard" component={DashboardSales} />
      </Switch>
    </Router>
  );
}
