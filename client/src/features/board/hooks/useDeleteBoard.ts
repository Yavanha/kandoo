import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Board, DeleteBoardType } from "../types";
import { remove } from "@/core/api";
import { GET_BOARDS_CACHE_KEY } from "../constants/constants";
import { AxioResponsError } from "@/core/types";
import { AxiosError } from "axios";
import { useNavigate } from "@tanstack/react-router";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation<
    Board,
    AxiosError<AxioResponsError>,
    DeleteBoardType,
    unknown
  >({
    mutationFn: async (data: DeleteBoardType) => {
      return await remove<Board>(`/boards/${data.id}`);
    },
    onSuccess: (_, { id: deletedId }) => {
      queryClient.invalidateQueries({
        queryKey: [GET_BOARDS_CACHE_KEY],
      });
      const boards = queryClient
        .getQueryData<Board[]>([GET_BOARDS_CACHE_KEY])
        ?.filter((board) => board.id !== deletedId);
      if (boards && boards.length) {
        navigate({
          to: "/boards/$id",
          params: {
            id: boards[0].id,
          },
        });
      } else {
        navigate({
          from: "/boards",
        });
      }
    },
  });
  return {
    deleteBoardMutation: mutation,
  };
};
