export type PostType = {
  _id: string;
  title: string;
  slug?: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  imageBase64?: string;
  content: string;
  readingTime: number;
  createdAt: Date;
  updatedAt: Date;
};
