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
import Logout from "pages/Admin/Logout";

//SV
import DashboardSupervisor from "pages/Supervisor/Dashboard";
//Sales
import DashboardSales from "pages/Sales/Dashboard";
import AuthClient from "pages/AuthClient";
import Detail from "pages/Admin/Order/Detail";
import Visit from "pages/Sales/Visit";
import History from "pages/Sales/History";
import SalesOrder from "pages/Sales/Visit/Order";
import DetailVisit from "pages/Sales/Visit/DetailVisit";
import DetailHistory from "pages/Sales/History/Detail";
import Profile from "pages/Sales/Profile";
import ChatSales from "pages/Sales/Chat";
import ChatSupervisor from "pages/Supervisor/Dashboard/Chat";
import ListChat from "pages/Supervisor/Dashboard/ListChat";
import ProductSV from "pages/Supervisor/Product";
import VisitSV from "pages/Supervisor/Visit";
import Tracking from "pages/Supervisor/Tracking";
import ProfileSV from "pages/Supervisor/Profile";
import DetailTrack from "pages/Supervisor/Tracking/DetailTrack";
import DetailHistorySV from "pages/Supervisor/Tracking/DetailHistory";

export default function AppRoute() {
  return (
    <Router>
      <Switch>
        {/* HOME */}
        <Route exact path="/welcome" component={Welcome} />
        {/* Router Admin */}
        <Route exact path="/admin/auth" component={Auth} />
        <Route exact path="/admin/dashboard" component={DashboardAdm} />
        {/* PRODUCT */}
        <Route exact path="/admin/product" component={Product} />
        <Route exact path="/admin/product/add" component={AddProduct} />
        <Route exact path="/admin/product/edit/:id" component={EditProduct} />
        {/* USERS */}
        <Route exact path="/admin/users" component={Users} />
        <Route exact path="/admin/users/add" component={AddUser} />
        <Route exact path="/admin/users/edit/:id" component={EditUser} />
        {/* APOTIK */}
        <Route exact path="/admin/apotik" component={Apotik} />
        <Route exact path="/admin/apotik/add" component={AddApotik} />
        <Route exact path="/admin/apotik/edit/:id" component={EditApotik} />
        {/* CHAT */}
        <Route exact path="/admin/chat" component={Chat} />
        {/* ORDER */}
        <Route exact path="/admin/order" component={Order} />
        <Route exact path="/admin/order/detail" component={Detail} />
        <Route exact path="/admin/logout" component={Logout} />

        {/* AUTH */}
        <Route exact path="/" component={AuthClient} />
        {/* Router Supervisor */}
        <Route exact path="/supervisor/home" component={DashboardSupervisor} />
        <Route exact path="/supervisor/chat" component={ListChat} />
        <Route exact path="/supervisor/chat/detail" component={ChatSupervisor} />
        <Route exact path="/supervisor/product-sv" component={ProductSV} />
        <Route exact path="/supervisor/visit-sv" component={VisitSV} />
        <Route exact path="/supervisor/sales-track" component={Tracking} />
        <Route exact path="/supervisor/sales-track/detail" component={DetailTrack} />
        <Route exact path="/supervisor/sales-track/detail/detail-history" component={DetailHistorySV} />
        <Route exact path="/supervisor/profile" component={ProfileSV} />

        {/* Router Sales */}
        <Route exact path="/sales/dashboard" component={DashboardSales} />
        <Route exact path="/sales/profile" component={Profile} />
        <Route exact path="/sales/visit" component={Visit} />
        <Route exact path="/sales/history" component={History} />
        <Route exact path="/sales/history/detail" component={DetailHistory} />
        <Route exact path="/sales/visit/detail-visit/order" component={SalesOrder} />
        <Route exact path="/sales/visit/detail-visit" component={DetailVisit} />
        <Route exact path="/sales/chat" component={ChatSales} />
      </Switch>
    </Router>
  );
}
