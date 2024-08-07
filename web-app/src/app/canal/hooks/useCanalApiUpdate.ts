import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { http } from "../../infra/http";
import type { CanalUpdateModel } from "../models/canal-update.model";

interface UseCanalApiUpdateProps { 
  onSuccess?: () => void;
}

export function useCanalApiUpdate({ onSuccess }: UseCanalApiUpdateProps) {

  const queryClient = useQueryClient();

	return useMutation({
      mutationFn: (canal: CanalUpdateModel) => http.put(`api/Canal/${canal.id}`, { json: canal }).json(),
      onSuccess: () => {
        console.log('Item atualizado com sucesso!');
        onSuccess?.();
        queryClient.invalidateQueries({ queryKey: ['canal'] });
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