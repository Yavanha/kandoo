import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Board, DeleteBoardType } from "../types";
import { remove } from "@/core/api";
import { GET_BOARDS_CACHE_KEY } from "../constants/constants";
import { AxioResponsError } from "@/core/types";
import { AxiosError } from "axios";
import { useSetAtom } from "jotai";
import { activeBoardAtom } from "../store/atoms";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  const setActiveBoard = useSetAtom(activeBoardAtom);

  const mutation = useMutation<
    Board,
    AxiosError<AxioResponsError>,
    DeleteBoardType,
    unknown
  >({
    mutationFn: async (data: DeleteBoardType) => {
      console.log(data.id);
      return await remove<Board>(`/boards/${data.id}`);
    },
    onSuccess: (_, { id: deletedId }) => {
      queryClient.invalidateQueries({ queryKey: [GET_BOARDS_CACHE_KEY] });
      const boards = queryClient
        .getQueryData<Board[]>([GET_BOARDS_CACHE_KEY])
        ?.filter((board) => board.id !== deletedId);
      if (boards && boards.length) {
        setActiveBoard(boards[0]);
      } else {
        setActiveBoard(null);
      }
    },
  });
  return {
    deleteBoardMutation: mutation,
  };
};
