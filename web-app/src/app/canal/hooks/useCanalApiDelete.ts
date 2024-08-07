import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../infra/http";
import { notification } from "antd";


export function useCanalApiDelete() {

  const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({id}: {id: string}) => http.delete(`api/Canal/${id}`).json(),
      onSuccess: () => {
        console.log('Item excluído com sucesso!');
        queryClient.invalidateQueries({ queryKey: ['canal'] });
        notification.success({
          message: 'Sucesso!',
          description: 'Item excluído com sucesso!',
        });
      },
      onError: (error) => {
        console.error('Erro ao excluir item:', error);
        notification.error({
          message: 'Erro!',
          description: `Erro ao excluir item: ${error.message}`,
        });
      },
      });
}