export const IsProductionMode = process.env.NODE_ENV !== "development";
export const StripeMainAPIKey = IsProductionMode
  ? "sk_test_zCSjOxiIHTNmPJUBdg4hFQAZ"
  : "sk_test_zCSjOxiIHTNmPJUBdg4hFQAZ";
export const webURL = !IsProductionMode ? "localhost:3001" : " ";