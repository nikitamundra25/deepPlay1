export interface ISet {
  title: String;
  description: String;
  isPublic: Boolean;
  folderId: String | null;
  userId: String;
  sharableLink: String;
  status: Boolean;
  isCopy: Boolean;
  isDeleted: Boolean;
  copyIndex: Number;
}
export interface IUpdateSet {
  title: String;
  description: String;
}
