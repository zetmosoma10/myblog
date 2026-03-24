import type { ResponsePostType } from "./post.type";

export type Response = {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  totalDocuments: number;
  data: ResponsePostType[];
};
