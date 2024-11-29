import { useQuery } from "@tanstack/react-query";
import instance from "../api/axios";
import { voteChatRes } from "../types/initialVoteChatTypes";

const fetchVoteChatData = async (memberPk: number) => {
  const response = await instance.get<voteChatRes>(`/api/community/init/${memberPk}`);
  return response.data;
};

export const useVoteChatData = (memberPk: number | undefined) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["voteChatData", memberPk],
    queryFn: () => fetchVoteChatData(memberPk!),
    enabled: !!memberPk
  });

  return {
    initialVotes: data ? { hate: data.hate, like: data.like } : { hate: 0, like: 0 },
    voting: data?.isVoting || "not voting",
    chatLi: data?.chattingList || [],
    loading: isLoading,
    error: isError ? error : null
  };
};
