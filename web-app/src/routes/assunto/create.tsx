import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Flex, Input, Modal } from "antd";
import { useState } from "react";
import { useAssuntoApiInsert } from "../../app/assunto/hooks/useAssuntoApiInsert";
import { AssuntoCreateModel } from "../../app/assunto/models/assunto-create.model";

export const Route = createFileRoute("/assunto/create")({
	component: AssuntoCreateModalPage,
});

function AssuntoCreateModalPage() {
	const navigate = useNavigate();
	const { mutate, isPending } = useAssuntoApiInsert();
	const [descricao, setDescricao] = useState("");
	const [errors, setErrors] = useState<Record<string, string[]>>({});

	function save() {
		const assunto = { descricao };
		const { success, error, data } = AssuntoCreateModel.safeParse(assunto);
		console.log(success);
		console.log(error?.flatten());

		setErrors({});

		if (!success) {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			setErrors(error!.flatten().fieldErrors);
			return;
		}

		mutate(data);

        back();
	}

	function back() {
		navigate({ to: "/assunto", replace: true });
	}

	return (
		<>
			<Modal title="Assunto" open onOk={save} onCancel={back}>
				<Flex vertical>
					<Flex gap="middle" align="flex-start">
						<pre>Descrição:</pre>
						<Input
							placeholder="Basic usage"
							value={descricao}
							onChange={(e) => setDescricao(e.target.value)}
						/>
					</Flex>
                        {errors.descricao?.map((error) => (
                            <div key={error} style={ {color: "#c80812"} }>{error}</div>
                        ))}                    
				</Flex>
			</Modal>
		</>
	);
}
