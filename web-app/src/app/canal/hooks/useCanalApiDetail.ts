import { useQuery } from "@tanstack/react-query";
import { http } from "../../infra/http";

interface Canal {
    id: number;
    nome: string;
    }

export function useCanalApiDetail(id: string) {
  return useQuery({
    queryKey: ["canal", id],
    queryFn: async () => {
        return http.get(`api/Canal/${id}`).json<Canal>();
    }
  });
}