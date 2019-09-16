import React from "react";
import { AppRoutes } from "./config/AppRoutes";

const Login = React.lazy(() => import("./container/Auth/Login"));
const Signup = React.lazy(() => import("./container/Auth/Signup"));
const HomePage = React.lazy(() => import("./container/HomePage"));
const Dashboard = React.lazy(() => import("./container/Dashboard"))
const routes = [
  {
    path: AppRoutes.HOME_PAGE.url,
    exact: AppRoutes.HOME_PAGE.exact,
    name: AppRoutes.HOME_PAGE.name,
    component: HomePage
  },
  {
    path: AppRoutes.LOGIN.url,
    exact: AppRoutes.LOGIN.exact,
    name: AppRoutes.LOGIN.name,
    component: Login
  },
  {
    path: AppRoutes.SIGNUP.url,
    exact: AppRoutes.SIGNUP.exact,
    name: AppRoutes.SIGNUP.name,
    component: Signup
  },
  {
    path: AppRoutes.DASHBOARD.url,
    exact: AppRoutes.DASHBOARD.exact,
    name: AppRoutes.DASHBOARD.name,
    component: Dashboard
  },
];


export default routes;
