export  interface Playlist {
  id: string;
  title: string;
  videoCount: number;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  duration: string;
}
export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  playlists: number;
  videos: number;
  students: number;
  progress: number;
}