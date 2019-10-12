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

export interface IUpdateMove {
  title: String;
  description: String;
}
