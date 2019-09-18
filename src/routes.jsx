import React from "react";
import { AppRoutes } from "./config/AppRoutes";

const HomePage = React.lazy(() => import("./container/HomePage"));
const Dashboard = React.lazy(() => import("./container/Dashboard"));
const Settings = React.lazy(() => import("./container/Settings"));
const Folders = React.lazy(() => import("./container/Folders"));
const Sets = React.lazy(() => import("./container/Sets"));

const routes = [
  {
    path: AppRoutes.HOME_PAGE.url,
    exact: AppRoutes.HOME_PAGE.exact,
    name: AppRoutes.HOME_PAGE.name,
    component: HomePage
  },
  {
    path: AppRoutes.DASHBOARD.url,
    exact: AppRoutes.DASHBOARD.exact,
    name: AppRoutes.DASHBOARD.name,
    component: Dashboard
  },
  {
    path: AppRoutes.SETS.url,
    name: AppRoutes.SETS.name,
    exact: AppRoutes.SETS.exact,
    component: Sets
  },
  {
    path: AppRoutes.FOLDERS.url,
    name: AppRoutes.FOLDERS.name,
    exact: AppRoutes.FOLDERS.exact,
    component: Folders
  },
  {
    path: AppRoutes.SETTINGS.url,
    name: AppRoutes.SETTINGS.name,
    exact: AppRoutes.SETTINGS.exact,
    component: Settings
  },
];

export default routes;
