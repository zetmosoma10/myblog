import { getLatestPosts } from "#/server/postsSeverFunctions";
import { useQuery, queryOptions } from "@tanstack/react-query";

// * We use queryOption to reuse it in loader function when ensuring that the already exist in the react-query cached or not. We also reuse it useQuery itself for fetching the data

export const postsQueryOptions = () =>
  queryOptions({
    queryKey: ["latest-posts"],
    queryFn: () => getLatestPosts(),
    staleTime: 1000 * 60 * 60,
  });

const useGetLatestPosts = () => {
  return useQuery(postsQueryOptions());
};

export default useGetLatestPosts;
