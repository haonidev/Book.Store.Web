import {z} from "zod";

export const AssuntoUpdateModel = z.object({
  id: z.number()
  .positive({ message: "O campo id deve ser maior que 0" }),
  
  descricao: z.string()
  .min(3, { message: "O campo descricao deve ter no mínimo 1 caracteres" })
  .max(20, { message: "O campo descricao deve ter no máximo 20 caracteres" })

});

export type AssuntoUpdateModel = z.infer<typeof AssuntoUpdateModel>;