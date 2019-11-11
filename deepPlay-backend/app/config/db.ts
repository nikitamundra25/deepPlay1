import { IsProductionMode } from "./app";

export const DBProtocol: string = IsProductionMode ? "mongodb" : "mongodb";
export const DBHost: string = IsProductionMode ? "localhost" : "localhost";
export const DBName: string = IsProductionMode ? "deepPlay" : "deepPlay";
export const Port: number = !IsProductionMode ? 8000 : 8005 