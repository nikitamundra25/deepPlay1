export const IsProductionMode = process.env.NODE_ENV !== "development";
export const webURL = !IsProductionMode
  ? "localhost:3001"
  : "192.249.123.124:8005";
export const algoliaAppId = IsProductionMode ? "K1EILBWXQT" : "K1EILBWXQT";
export const algoliaAPIKey = IsProductionMode
  ? "fefd78064914ebbb819df9c15948086b"
  : "fefd78064914ebbb819df9c15948086b";
export const ServerURL = !IsProductionMode
  ? "http://localhost:8000"
  : "http://192.249.123.124:8005";
export const s3Key = {
  keyId: "AKIAR7XBBEDAFZWCMAIC",
  key: "Oe9OQ2l/rB6UeO0u1+mAli3hIM2RbXTMhzD9QPrm",
  bucketName: "deepplay-video"
};
