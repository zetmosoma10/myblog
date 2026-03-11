import { getPost } from "#/server/postsSeverFunctions";
import { useQuery, queryOptions } from "@tanstack/react-query";

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
