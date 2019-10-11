export interface IFolder {
  title: String;
  description: String;
  isPublic: Boolean;
  userId: String;
  sharableLink: String;
  status: Boolean;
  isDeleted: Boolean;
  isCopy: Boolean;
}

export interface IUpdateFolder {
  title: String;
  description: String;
}
