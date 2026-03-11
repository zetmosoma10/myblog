import { getPosts } from "#/server/postsSeverFunctions";
import { useQuery, queryOptions } from "@tanstack/react-query";

export const postsQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: () => getPosts(),
  staleTime: 1000 * 60 * 5,
});

const useGetPosts = () => {
  return useQuery(postsQueryOptions);
};

export default useGetPosts;
