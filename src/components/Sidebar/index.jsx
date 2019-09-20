import { AppRoutes } from "../../config/AppRoutes";

export const SidebarComponent = [
  {
    name: AppRoutes.DASHBOARD.name,
    url: AppRoutes.DASHBOARD.url,
    icon: "ni ni-album-2"
  },
  // {
  //   name: AppRoutes.ADD_MOVE.name,
  //   url: AppRoutes.ADD_MOVE.url,
  //   icon: "ni ni-album-2"
  // },
  {
    name: AppRoutes.SETS.name,
    url: AppRoutes.SETS.url,
    icon: "far fa-file-video"
  },
  {
    name: AppRoutes.FOLDERS.name,
    url: AppRoutes.FOLDERS.url,
    icon: "fas fa-folder"
  },
  {
    name: AppRoutes.SETTINGS.name,
    url: AppRoutes.SETTINGS.url,
    icon: "fas fa-cog"
  }
];
