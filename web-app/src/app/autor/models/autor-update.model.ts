import {z} from "zod";

export const AutorUpdateModel = z.object({
  id: z.number()
  .positive({ message: "O campo id deve ser maior que 0" }),
  
  nome: z.string()
  .min(3, { message: "O campo nome deve ter no mínimo 1 caracteres" })
  .max(40, { message: "O campo nome deve ter no máximo 40 caracteres" })

});

export type AutorUpdateModel = z.infer<typeof AutorUpdateModel>;