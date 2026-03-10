export type PostType = {
  _id: string;
  title: string;
  excerpt: string;
  tags: string[];
  content: string;
  readingTime: number;
  createdAt: Date;
  updatedAt: Date;
};
