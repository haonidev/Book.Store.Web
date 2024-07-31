import { useQuery } from "@tanstack/react-query";
import { http } from "../../infra/http";

interface Assunto {
    id: number;
    descricao: string;
    }

export function useAssuntoApi() {
  return useQuery({
    queryKey: ["assuntos"],
    queryFn: async () => {
        return http.get("api/Assuntos").json<Assunto[]>();
    }
  });
}