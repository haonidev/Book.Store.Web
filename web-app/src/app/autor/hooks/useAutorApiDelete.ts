import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { http } from "../../infra/http";


export function useAutorApiDelete() {

  const queryClient = useQueryClient();

	return useMutation({
      mutationFn: ({id}: {id: string}) => http.delete(`api/Autores/${id}`).json(),
      onSuccess: () => {
        console.log('Item excluído com sucesso!');
        queryClient.invalidateQueries({ queryKey: ['autores'] });
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