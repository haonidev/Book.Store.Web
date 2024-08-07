import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { http } from "../../infra/http";
import type { AutorUpdateModel } from "../models/autor-update.model";

interface UseAutorApiUpdateProps { 
  onSuccess?: () => void;
}

export function useAutorApiUpdate({ onSuccess }: UseAutorApiUpdateProps) {

  const queryClient = useQueryClient();

	return useMutation({
      mutationFn: (autor: AutorUpdateModel) => http.put(`api/Autores/${autor.id}`, { json: autor }).json(),
      onSuccess: () => {
        console.log('Item atualizado com sucesso!');
        onSuccess?.();
        queryClient.invalidateQueries({ queryKey: ["autores"] });
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