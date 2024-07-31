import { useMutation, useQuery } from "@tanstack/react-query";
import { http } from "../../infra/http";


export function useAssuntoApiDelete(id: string) {
  http.delete(`api/Assuntos/${id}`).json();
}