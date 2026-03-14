import { getPosts } from "#/server/postsSeverFunctions";
import { useQuery, queryOptions } from "@tanstack/react-query";

// * We use queryOption to reuse it in loader function when ensuring that the already exist in the react-query cached or not. We also reuse it useQuery itself for fetching the data

export const postsQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: () => getPosts(),
  staleTime: 1000 * 60 * 5,
});

const useGetPosts = () => {
  return useQuery(postsQueryOptions);
};

export default useGetPosts;
