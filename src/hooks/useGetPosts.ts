import { getPosts } from "#/server/postsSeverFunctions";
import type { PostSearchQuery } from "#/types/post.type";
import { useQuery, queryOptions } from "@tanstack/react-query";

// * We use queryOption to reuse it in loader function when ensuring that the already exist in the react-query cached or not. We also reuse it useQuery itself for fetching the data

export const postsQueryOptions = (query: PostSearchQuery) =>
  queryOptions({
    queryKey: ["posts", query],
    queryFn: () => getPosts({ data: query }),
    staleTime: 1000 * 60 * 5,
  });

const useGetPosts = (query: PostSearchQuery) => {
  return useQuery(postsQueryOptions(query));
};

export default useGetPosts;
