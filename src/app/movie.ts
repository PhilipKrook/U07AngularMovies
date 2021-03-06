export interface Movie {
  id: number;
  title: string;
  overview?: string;
  poster_path: ImageBitmap;
  profile_path: ImageBitmap;
  tagline?: string;
  cast?: any[];
  crew?: any[];
  name: string;
  biography?: string;
}
