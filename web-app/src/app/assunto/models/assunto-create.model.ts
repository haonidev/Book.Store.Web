import {z} from "zod";

export const AssuntoCreateModel = z.object({
  descricao: z.string()
  .min(3, { message: "O campo descricao deve ter no mínimo 1 caracteres" })
  .max(20, { message: "O campo descricao deve ter no máximo 20 caracteres" })

});

export type AssuntoCreateModel = z.infer<typeof AssuntoCreateModel>;