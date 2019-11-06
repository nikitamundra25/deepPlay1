export const IsProductionMode = process.env.NODE_ENV !== "development";
export const webURL = !IsProductionMode
  ? "localhost:3001"
  : "http://54.85.183.188:8009";
export const CloudinaryAPIKey = IsProductionMode
  ? "955984653579861"
  : "955984653579861";
export const CloudinaryAPISecretKey = IsProductionMode
  ? "LR2WYnnszbwc8Ie2DyOCcIdLfIc"
  : "LR2WYnnszbwc8Ie2DyOCcIdLfIc";
export const CloudName = IsProductionMode ? "rishabhbula" : "rishabhbula";
export const algoliaAppId = IsProductionMode ? "K1EILBWXQT" : "K1EILBWXQT";
export const algoliaAPIKey = IsProductionMode
  ? "fefd78064914ebbb819df9c15948086b"
  : "fefd78064914ebbb819df9c15948086b";
export const ServerURL = !IsProductionMode
  ? "http://192.168.2.120:8000"
  : "http://54.85.183.188";
export const s3Key = {
  keyId: "AKIA5R6U3BHKVS3EFDGW",
  key: "hRZ8bTRNBsxThak7Dmf8lep7q7whcSRlRiFX/1OQ",
  bucketName: "hope.bucket"
};
