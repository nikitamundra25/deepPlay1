declare namespace Express {
  export interface Request {
    currentUser?: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    };
  }
}

declare module "cloudinary";
declare module "ytdl-core";
declare module "algoliasearch";
declare module "ffmpeg-extract-frames";
declare module "video-thumbnail-generator";
declare module "ffmpeg";
declare var orderBy: any
