export interface Post {
  id: number;
  image: string;
  description: string;
  user_id: number;
}

export interface PostState {
  list: Post[];
  searchResult: Post[];
  currentId: number | null;
}