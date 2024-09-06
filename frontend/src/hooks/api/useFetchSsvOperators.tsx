import { SSV_OPERATORS } from "@/constants/query";
import { useAppDispatch } from "@/redux/hooks";
import { appActions } from "@/redux/slices/app-slice";
import { SSVOperatorsData } from "@/types/server";
import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useFetchSsvOperators = () => {
  const dispatch = useAppDispatch();

  const fetchOperators = async ({ pageParam = 1 }: { pageParam?: number }) => {
    const { data } = await axios.get<SSVOperatorsData>(
      `https://api.ssv.network/api/v4/holesky/operators?ordering=id:asc&page=${pageParam}&perPage=10`
    );
    return data;
  };

  const onSuccess = (data: InfiniteData<SSVOperatorsData>) => {
    data.pages.forEach((pageData, index) => {
      dispatch(
        appActions.setSsvOperatorsData({ page: index + 1, data: pageData })
      );
    });
  };

  const onError = (error: AxiosError) => {
    console.error("Error fetching operators:", error);
  };

  return useInfiniteQuery<SSVOperatorsData, AxiosError>({
    queryKey: [SSV_OPERATORS],
    queryFn: ({ pageParam = 1 }) => fetchOperators({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.pagination?.pages && nextPage <= lastPage.pagination.pages
        ? nextPage
        : undefined;
    },
    onSuccess,
    onError,
    staleTime: 60 * 1000,
  });
};
