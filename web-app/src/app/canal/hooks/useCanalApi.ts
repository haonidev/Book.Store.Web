import { useQuery } from "@tanstack/react-query";
import { http } from "../../infra/http";

interface Canal {
    id: number;
    nome: string;
}

export function useCanalApi() {
  return useQuery({
    queryKey: ["canal"],
    queryFn: async () => {
        return http.get("api/Canal").json<Canal[]>();
    }
  });
}