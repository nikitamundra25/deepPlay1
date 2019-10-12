import React from "react";
import { AppRoutes } from "./config/AppRoutes";

const HomePage = React.lazy(() => import("./container/HomePage"));
const Dashboard = React.lazy(() => import("./container/Dashboard"));
const Settings = React.lazy(() => import("./container/Settings"));
const Folders = React.lazy(() => import("./container/Folders"));
const Sets = React.lazy(() => import("./container/Sets"));
const CreateSets = React.lazy(() => import("./components/Sets/createSet"));
const ResetPassword = React.lazy(() =>
  import("./container/Auth/ResetPassword")
);
const Page404 = React.lazy(() => import("./components/Page404"));
const Move = React.lazy(() => import("./container/Move"));
const FolderDetails = React.lazy(() =>
  import("./components/Folders/FolderDetails/FolderDetails")
);
const MoveDetails = React.lazy(() => import("./components/Move/MoveDetails"));
const SetDetails = React.lazy(() => import("./components/Sets/SetDetails"));
const FolderSharedLink = React.lazy(() =>
  import("./components/comman/shareableLink/FolderSharedLink")
);
const setSharedLink = React.lazy(() =>
  import("./components/comman/shareableLink/SetSharedLink")
);
const changePassword = React.lazy(() => import("./container/ChangePassword"));
const allSetSharedLink = React.lazy(() =>
  import("./components/comman/shareableLink/AllSetSharedLink")
);
const sampleSet = React.lazy(() => import("./components/SampleSet"));
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
    path: AppRoutes.CREATE_SET.url,
    name: AppRoutes.CREATE_SET.name,
    exact: AppRoutes.CREATE_SET.exact,
    component: CreateSets
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
    path: AppRoutes.MOVE_DETAILS.url,
    name: AppRoutes.MOVE_DETAILS.name,
    exact: AppRoutes.MOVE_DETAILS.exact,
    component: MoveDetails
  },
  {
    path: AppRoutes.FOLDER_DETAILS.url,
    name: AppRoutes.FOLDER_DETAILS.name,
    exact: AppRoutes.FOLDER_DETAILS.exact,
    component: FolderDetails
  },
  {
    path: AppRoutes.SET_DETAILS.url,
    name: AppRoutes.SET_DETAILS.name,
    exact: AppRoutes.SET_DETAILS.exact,
    component: SetDetails
  },
  {
    path: AppRoutes.FOLDER_SHARED_LINK.url,
    name: AppRoutes.FOLDER_SHARED_LINK.name,
    exact: AppRoutes.FOLDER_SHARED_LINK.exact,
    component: FolderSharedLink
  },
  {
    path: AppRoutes.SET_SHARED_LINK.url,
    name: AppRoutes.SET_SHARED_LINK.name,
    exact: AppRoutes.SET_SHARED_LINK.exact,
    component: setSharedLink
  },
  {
    path: AppRoutes.CHANGE_PASSWORD.url,
    name: AppRoutes.CHANGE_PASSWORD.name,
    exact: AppRoutes.CHANGE_PASSWORD.exact,
    component: changePassword
  },
  {
    path: AppRoutes.ALL_SET_SHARED_LINK.url,
    name: AppRoutes.ALL_SET_SHARED_LINK.name,
    exact: AppRoutes.ALL_SET_SHARED_LINK.exact,
    component: allSetSharedLink
  },
  {
    path: AppRoutes.SAMPLE_SET.url,
    name: AppRoutes.SAMPLE_SET.name,
    exact: AppRoutes.SAMPLE_SET.exact,
    component: sampleSet
  }
];

export default routes;
