import { getPost } from "#/server/postsSeverFunctions";
import { useQuery, queryOptions } from "@tanstack/react-query";

// * We use queryOption to reuse it in loader function when ensuring that the already exist in the react-query cached or not. We also reuse it useQuery itself for fetching the data

export const postQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["post", slug],
    queryFn: () => getPost({ data: slug }),
    staleTime: 1000 * 60 * 5,
  });

const useGetPost = (slug: string) => {
  return useQuery(postQueryOptions(slug));
};

export default useGetPost;
