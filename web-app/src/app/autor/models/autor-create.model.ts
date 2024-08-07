import {z} from "zod";

export const AutorCreateModel = z.object({
  nome: z.string()
  .min(3, { message: "O campo nome deve ter no mínimo 3 caracteres" })
  .max(40, { message: "O campo descricao deve ter no máximo 40 caracteres" })

});

export type AutorCreateModel = z.infer<typeof AutorCreateModel>;