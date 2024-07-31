import { useQuery } from "@tanstack/react-query";
import { http } from "../../infra/http";

interface Autor {
    id: number;
    nome: string;
    }

export function useAutorApiDetail(id: string) {
  return useQuery({
    queryKey: ["autores", id],
    queryFn: async () => {
        return http.get(`api/Autores/${id}`).json<Autor>();
    }
  });
}