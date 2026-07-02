export type Article = {
  id: string;
  title: string;
  url: string;
  sentences: Sentence[];
  isRead: boolean;
  createdAt: string;
};

export type Sentence = {
    id: string;
    text: string;
    memo: string;
};