import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { http } from "../../infra/http";
import type { AutorCreateModel } from "../models/autor-create.model";

export function useAutorApiInsert() {

  const queryClient = useQueryClient();

	return useMutation({
      mutationFn: (autor: AutorCreateModel) => http.post("api/Autores", { json: autor }).json(),
      onSuccess: () => {
        console.log('Item criado com sucesso!');
        queryClient.invalidateQueries({ queryKey: ['autores'] });
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