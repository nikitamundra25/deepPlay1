export const IsProductionMode = process.env.NODE_ENV !== "development";
export const webURL = !IsProductionMode
  ? "localhost:3001"
  : "http://192.249.123.124:8005";
export const CloudinaryAPIKey = IsProductionMode
  ? "955984653579861"
  : "955984653579861";
export const CloudinaryAPISecretKey = IsProductionMode
  ? "LR2WYnnszbwc8Ie2DyOCcIdLfIc"
  : "LR2WYnnszbwc8Ie2DyOCcIdLfIc";
export const CloudName = IsProductionMode ? "rishabhbula" : "rishabhbula";
export const algoliaAppId = IsProductionMode ? "HHR0OR8HSO" : "HHR0OR8HSO";
export const algoliaAPIKey = IsProductionMode
  ? "67d8975eec42c620cf98a1f3acb517f3"
  : "67d8975eec42c620cf98a1f3acb517f3";
export const ServerURL = !IsProductionMode
  ? "http://192.168.2.120:8000"
  : "http://192.249.123.124";
export const s3Key = {
  keyId: "AKIA5R6U3BHKVS3EFDGW",
  key: "hRZ8bTRNBsxThak7Dmf8lep7q7whcSRlRiFX/1OQ",
  bucketName: "hope.bucket"
};
