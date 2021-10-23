import { useQuery } from "react-query";

export const useGetBullshit = () => {
  return useQuery({
    queryKey: "bs",
    queryFn: () => [],
  });
};
