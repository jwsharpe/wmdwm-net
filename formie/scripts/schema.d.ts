export interface Photo {
  id: string;
  u: string;
  width: number | null;
  height: number | null;
  takenAt: number | null;
}

export interface AlbumPhoto {
  id: string;
  url: string;
  width: number | null;
  height: number | null;
  takenAt: number | null;
  albumUrl: string;
}

export interface AlbumApiResponse {
  photos: Photo[];
}
