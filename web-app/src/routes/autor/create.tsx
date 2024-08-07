import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Flex, Input, Modal } from "antd";
import { useState } from "react";
import { useAutorApiInsert } from "../../app/autor/hooks/useAutorApiInsert";
import { AutorCreateModel } from "../../app/autor/models/autor-create.model";

export const Route = createFileRoute("/autor/create")({
	component: AutorCreateModalPage,
});

function AutorCreateModalPage() {
	const navigate = useNavigate();
	const { mutate, isPending } = useAutorApiInsert();
	const [nome, setNome] = useState("");
	const [errors, setErrors] = useState<Record<string, string[]>>({});

	function save() {
		const autor = { nome };
		const { success, error, data } = AutorCreateModel.safeParse(autor);
		console.log(success);
		console.log(error?.flatten());

		setErrors({});

		if (!success) {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			setErrors(error!.flatten().fieldErrors);
			console.log("Deu ruim!");
			return;
		}

		mutate(data);

        back();

	}

	function back() {
		navigate({ to: "/autor", replace: true });
	}

	return (
		<>
			<Modal title="Autor" open onOk={save} onCancel={back}>
				<Flex vertical>
					<Flex gap="middle" align="flex-start">
						<pre>Nome:</pre>
						<Input
							placeholder="Basic usage"
							value={nome}
							onChange={(e) => setNome(e.target.value)}
						/>
					</Flex>
                        {errors.Nome?.map((error) => (
                            <div key={error} style={ {color: "#c80812"} }>{error}</div>
                        ))}                    
				</Flex>
			</Modal>
		</>
	);
}
