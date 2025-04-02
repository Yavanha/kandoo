import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Board, DeleteBoardType } from "../types";
import { remove } from "@/core/api";
import { GET_BOARDS_CACHE_KEY } from "../constants/constants";
import { AxiosResponseError } from "@/core/types";
import { AxiosError } from "axios";
import { useNavigate } from "@tanstack/react-router";
import { boardIdAtom } from "../store/atoms";
import { useSetAtom } from "jotai";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  const setBoardIdAtom = useSetAtom(boardIdAtom);
  const navigate = useNavigate();
  const mutation = useMutation<
    Board,
    AxiosError<AxiosResponseError>,
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
        setBoardIdAtom(null);
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
