export interface Post {
  id?: number;
  image: any;
  description: string;
  user_id: number;
}

export interface PostState {
  list: Post[];
  searchResult: Post[];
  currentId: number | null;
  isLoading: boolean;
}

export interface PostAction {
  postId: number;
  username: string;
}
