export const IsProductionMode = process.env.NODE_ENV !== "development";
export const webURL = !IsProductionMode
  ? "localhost:3001"
  : "http://www.deepplay.org";
export const algoliaAppId = IsProductionMode ? "K1EILBWXQT" : "K1EILBWXQT";
export const algoliaAPIKey = IsProductionMode
  ? "fefd78064914ebbb819df9c15948086b"
  : "fefd78064914ebbb819df9c15948086b";
export const ServerURL = !IsProductionMode
  ? "http://localhost:8000"
  : "http://www.deepplay.org";
export const s3Key = {
  keyId: "AKIA5R6U3BHKVS3EFDGW",
  key: "hRZ8bTRNBsxThak7Dmf8lep7q7whcSRlRiFX/1OQ",
  bucketName: "hope.bucket"
};
