import {z} from "zod";

export const CanalCreateModel = z.object({
  nome: z.string()
  .min(3, { message: "O campo nome deve ter no mínimo 3 caracteres" })
  .max(40, { message: "O campo nome deve ter no máximo 40 caracteres" })

});

export type CanalCreateModel = z.infer<typeof CanalCreateModel>;