export interface IFolder {
  title: String;
  description: String;
  isPublic: Boolean;
  userId: String;
  sharableLink: String;
  status: Boolean;
  isDeleted: Boolean;
  isCopy: Boolean;
  copyCount: Number;
  copySetId: String;
}

export interface IUpdateFolder {
  title: String;
  description: String;
  isCopy: Boolean;
  copyCount: Number;
}
