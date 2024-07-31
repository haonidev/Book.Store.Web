import { useQuery } from "@tanstack/react-query";
import { http } from "../../infra/http";

interface Livro {
    id: number,
    titulo: string,
    editora: string,
    edicao: number,
    anoPublicacao: string,
    precoSugerido: number,
    autores: [
      {
        id: number,
        nome: string
      }
    ],
    assuntos: [
      {
        id: number,
        descricao: string
      }
    ]
  }

export function useLivroApi() {
  return useQuery({
    queryKey: ["livros"],
    queryFn: async () => {
        return http.get("api/Livros").json<Livro[]>();
    }
  });
}