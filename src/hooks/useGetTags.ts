import { getTags } from "#/server/tagsSeverFunction";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const tagsQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: () => getTags(),
});

const useGetTags = () => {
  return useQuery(tagsQueryOptions);
};

export default useGetTags;
