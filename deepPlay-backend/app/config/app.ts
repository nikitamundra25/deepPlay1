export const IsProductionMode = process.env.NODE_ENV !== "development";
export const webURL = !IsProductionMode
  ? "localhost:3001"
  : "3.19.246.229:8000";
export const CloudinaryAPIKey = IsProductionMode
  ? "955984653579861"
  : "955984653579861";
export const CloudinaryAPISecretKey = IsProductionMode
  ? "LR2WYnnszbwc8Ie2DyOCcIdLfIc"
  : "LR2WYnnszbwc8Ie2DyOCcIdLfIc";
export const CloudName = IsProductionMode ? "rishabhbula" : "rishabhbula";
export const algoliaAppId = IsProductionMode ? "K1EILBWXQT": "0RMKRXX9E0";
export const algoliaAPIKey = IsProductionMode ?"fefd78064914ebbb819df9c15948086b": "72e9502244d283d58ceda3c80fe15422";
export const ServerURL = !IsProductionMode
  ? "http://localhost:8000"
  : "http://3.19.246.229";
