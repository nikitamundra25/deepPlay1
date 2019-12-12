export interface IFolder {
  title: String;
  description: String;
  isPublic: Boolean;
  userId: String;
  sharableLink: String;
  status: Boolean;
  isDeleted: Boolean;
  isCopy: Boolean;
  copyIndex: Number;
}

export interface IUpdateFolder {
  title: String;
  description: String;
  isCopy: Boolean;
}
