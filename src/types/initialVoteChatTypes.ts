export interface voteChatRes {
  like: number;
  hate: number;
  isVoting: string;
  chattingList: [
    {
      id: number;
      content: string;
      profileImg: string;
      nickname: string;
    }
  ];
}
