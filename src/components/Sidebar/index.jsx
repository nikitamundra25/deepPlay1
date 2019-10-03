import { AppRoutes } from "../../config/AppRoutes";
import folder from "../../assets/img/icons/folder.svg";
import home from "../../assets/img/icons/home.svg";
import set from "../../assets/img/icons/set.svg";
import settings from "../../assets/img/icons/settings.svg";

export const SidebarComponent = [
  {
    name: AppRoutes.DASHBOARD.name,
    url: AppRoutes.DASHBOARD.url,
    icon: "ni ni-album-2",
    iconUrl: home
  },
  // {
  //   name: AppRoutes.ADD_MOVE.name,
  //   url: AppRoutes.ADD_MOVE.url,
  //   icon: "ni ni-album-2"
  // },
  {
    name: AppRoutes.SETS.name,
    url: AppRoutes.SETS.url,
    icon: "far fa-file-video",
    iconUrl: set
  },
  {
    name: AppRoutes.FOLDERS.name,
    url: AppRoutes.FOLDERS.url,
    icon: "fas fa-folder",
    iconUrl: folder
  },
  {
    name: AppRoutes.SETTINGS.name,
    url: AppRoutes.SETTINGS.url,
    icon: "fas fa-cog",
    iconUrl: settings
  }
];
