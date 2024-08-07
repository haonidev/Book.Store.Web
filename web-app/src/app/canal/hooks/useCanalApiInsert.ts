import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { http } from "../../infra/http";
import type { CanalCreateModel } from "../models/canal-create.model";

export function usecanalApiInsert() {

  const queryClient = useQueryClient();

	return useMutation({
      mutationFn: (canal: CanalCreateModel) => http.post("api/Canal", { json: canal }).json(),
      onSuccess: () => {
        console.log('Item criado com sucesso!');
        queryClient.invalidateQueries({ queryKey: ['canal'] });
        notification.success({
          message: 'Sucesso!',
          description: 'Item criado com sucesso!',
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