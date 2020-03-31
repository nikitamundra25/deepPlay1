import { IsProductionMode } from "./app";

export const DBProtocol: string = IsProductionMode ? "mongodb+srv" : "mongodb";
export const DBHost: string = IsProductionMode
  ? "deepplay_web:qrF2CGsArsSG4R3K@deepplay-pprn4.mongodb.net"
  : "localhost";
export const DBName: string = IsProductionMode ? "deepplay_web" : "deepPlay";
export const Port: number = !IsProductionMode ? 8000 : 8005;
