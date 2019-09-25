import React from "react";
import { AppRoutes } from "./config/AppRoutes";

const HomePage = React.lazy(() => import("./container/HomePage"));
const Dashboard = React.lazy(() => import("./container/Dashboard"));
const Settings = React.lazy(() => import("./container/Settings"));
const Folders = React.lazy(() => import("./container/Folders"));
const Sets = React.lazy(() => import("./container/Sets"));
const ResetPassword = React.lazy(() =>
  import("./container/Auth/ResetPassword")
);
const Page404 = React.lazy(() => import("./components/Page404"));
const Move = React.lazy(() => import("./container/Move"));
const RecentFolder = React.lazy(() =>
  import("./components/Folders/FolderDetails/recentFolder")
);
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
  {
    path: AppRoutes.RESET_PASSWORD.url,
    exact: AppRoutes.RESET_PASSWORD.exact,
    name: AppRoutes.RESET_PASSWORD.name,
    component: ResetPassword
  },
  {
    exact: true,
    path: "/404",
    name: "Page 404",
    component: Page404
  },
  {
    path: AppRoutes.MOVE.url,
    name: AppRoutes.MOVE.name,
    exact: AppRoutes.MOVE.exact,
    component: Move
  },
  {
    path: AppRoutes.RECENT_FOLDER.url,
    name: AppRoutes.RECENT_FOLDER.name,
    exact: AppRoutes.RECENT_FOLDER.exact,
    component: RecentFolder
  }
];

export default routes;
