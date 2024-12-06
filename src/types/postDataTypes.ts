export interface PostData {
  id: number;
  title: string;
  content: string;
  nickname: string;
  createdAt: string;
  profileImg: string;
  likes: number;
  imageUrlList: Array<string>;
  liked: boolean;
  view: number;
}
