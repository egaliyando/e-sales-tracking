import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardSupervisor from "../pages/Supervisor/Dashboard";
import DashboardSales from "../pages/Sales/Dashboard";
import DashboardAdm from "../pages/Admin/Dashboard";
import Welcome from "../pages/Welcome";

export default function AppRoute() {
  return (
    <Router>
      <Switch>
        {/* HOME */}
        <Route exact path="/" component={Welcome} />
        {/* Router Admin */}
        <Route exact path="/dashboard-adm" component={DashboardAdm} />
        {/* Router Supervisor */}
        <Route exact path="/dashboard-sv" component={DashboardSupervisor} />
        {/* Router Sales */}
        <Route exact path="/dashboard-sls" component={DashboardSales} />
      </Switch>
    </Router>
  );
}
