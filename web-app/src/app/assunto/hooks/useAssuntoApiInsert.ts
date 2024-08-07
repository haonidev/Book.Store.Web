import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { http } from "../../infra/http";
import type { AssuntoCreateModel } from "../models/assunto-create.model";

export function useAssuntoApiInsert() {

  const queryClient = useQueryClient();

	return useMutation({
      mutationFn: (assunto: AssuntoCreateModel) => http.post("api/Assuntos", { json: assunto }).json(),
      onSuccess: () => {
        console.log('Item criado com sucesso!');
        queryClient.invalidateQueries({ queryKey: ['assuntos'] });
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