import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { http } from "../../infra/http";


export function useAssuntoApiDelete() {

  const queryClient = useQueryClient();

	return useMutation({
      mutationFn: ({id}: {id: string}) => http.delete(`api/Assuntos/${id}`).json(),
      onSuccess: () => {
        console.log('Item excluído com sucesso!');
        queryClient.invalidateQueries({ queryKey: ['assuntos'] });
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