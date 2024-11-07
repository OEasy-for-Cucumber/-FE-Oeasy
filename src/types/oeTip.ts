export interface OeTip {
  content: string;
  color: string;
  order: number;
}

export interface OeData {
  content: string;
  oeTipTitleDTOList: OeTip[];
}
