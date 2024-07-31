import { useQuery } from "@tanstack/react-query";
import { http } from "../../infra/http";

interface Assunto {
    id: number;
    descricao: string;
    }

export function useAssuntoApiDetail(id: string) {
  return useQuery({
    queryKey: ["assuntos", id],
    queryFn: async () => {
        return http.get(`api/Assuntos/${id}`).json<Assunto>();
    }
  });
}