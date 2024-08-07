import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Flex, Input, Modal } from "antd";
import { useState } from "react";
import { CanalCreateModel } from "../../app/canal/models/canal-create.model";
import { usecanalApiInsert } from "../../app/canal/hooks/useCanalApiInsert";

export const Route = createFileRoute("/canal/create")({
	component: CanalCreateModalPage,
});

function CanalCreateModalPage() {
	const navigate = useNavigate();
	const { mutate, isPending } = usecanalApiInsert();
	const [nome, setNome] = useState("");
	const [errors, setErrors] = useState<Record<string, string[]>>({});

	function save() {
		const autor = { nome };
		const { success, error, data } = CanalCreateModel.safeParse(autor);
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
		navigate({ to: "/canal", replace: true });
	}

	return (
		<>
			<Modal title="Canal" open onOk={save} onCancel={back}>
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
