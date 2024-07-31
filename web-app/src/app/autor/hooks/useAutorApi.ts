import { useQuery } from "@tanstack/react-query";
import { http } from "../../infra/http";

interface Autor {
    id: number;
    nome: string;
    }

export function useAutorApi() {
  return useQuery({
    queryKey: ["autores"],
    queryFn: async () => {
        return http.get("api/Autores").json<Autor[]>();
    }
  });
}