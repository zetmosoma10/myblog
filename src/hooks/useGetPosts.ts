import { getPosts } from "#/server/postsSeverFunctions";
import { useQuery, queryOptions } from "@tanstack/react-query";

export const postQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: () => getPosts(),
  staleTime: 1000 * 60 * 5,
});

const useGetPosts = () => {
  return useQuery(postQueryOptions);
};

export default useGetPosts;
