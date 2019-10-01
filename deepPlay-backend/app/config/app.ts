export const IsProductionMode = process.env.NODE_ENV !== "development";
export const StripeMainAPIKey = IsProductionMode
  ? "sk_test_zCSjOxiIHTNmPJUBdg4hFQAZ"
  : "sk_test_zCSjOxiIHTNmPJUBdg4hFQAZ";
export const webURL = !IsProductionMode ? "localhost:3001" : " ";
export const CloudinaryAPIKey = IsProductionMode ? "955984653579861" : "955984653579861";
export const CloudinaryAPISecretKey = IsProductionMode ? "LR2WYnnszbwc8Ie2DyOCcIdLfIc" : "LR2WYnnszbwc8Ie2DyOCcIdLfIc";
export const CloudName = IsProductionMode? "rishabhbula":"rishabhbula";
export const algoliaAppId = '0RMKRXX9E0';
export const algoliaAPIKey = '72e9502244d283d58ceda3c80fe15422';