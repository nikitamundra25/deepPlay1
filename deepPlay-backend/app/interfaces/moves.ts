export interface IMove {
  title: String;
  description: String;
  videoUrl: String;
  tags: [String];
  isPublic: Boolean;
  userId: String;
  sharableLink: String;
  status: Boolean;
  setId: String;
}
export interface IMoveCopy {
  title: String;
  description: String;
  videoUrl: String;
  tags: [String];
  frames: [String];
  isPublic: Boolean;
  isDeleted: Boolean;
  userId: String;
  videoMetaData: any;
  videoName: String;
  status: Boolean;
  moveURL: String;
  setId: String;
  isCopy: Boolean;
}
