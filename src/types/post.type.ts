export type PostType = {
  _id: string;
  title: string;
  slug?: string;
  excerpt: string;
  tags: string[];
  content: string;
  readingTime: number;
  createdAt: Date;
  updatedAt: Date;
};
