import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { http } from "../../infra/http";
import type { AssuntoUpdateModel } from "../models/assunto-update.model";

interface UseAssuntoApiUpdateProps { 
  onSuccess?: () => void;
}

export function useAssuntoApiUpdate({ onSuccess }: UseAssuntoApiUpdateProps) {

  const queryClient = useQueryClient();

	return useMutation({
      mutationFn: (assunto: AssuntoUpdateModel) => http.put(`api/Assuntos/${assunto.id}`, { json: assunto }).json(),
      onSuccess: () => {
        console.log('Item atualizado com sucesso!');
        onSuccess?.();
        queryClient.invalidateQueries({ queryKey: ['assuntos'] });
        notification.success({
          message: 'Sucesso!',
          description: 'Item atualizado com sucesso!',
        });
      },
      onError: (error) => {
        console.error('Erro ao atualizar o item:', error);
        notification.error({
          message: 'Erro!',
          description: `Erro ao atualizar o item: ${error.message}`,
        });
      },
	  });
}