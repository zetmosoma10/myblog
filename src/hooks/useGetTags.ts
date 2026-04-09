import { getTags } from "#/server/tagsSeverFunction";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const tagsQueryOptions = queryOptions({
  queryKey: ["tags"],
  queryFn: () => getTags(),
  staleTime: 1000 * 60 * 5,
});

const useGetTags = () => {
  return useQuery(tagsQueryOptions);
};

export default useGetTags;
