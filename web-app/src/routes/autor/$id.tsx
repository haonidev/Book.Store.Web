import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Flex, Input, Modal } from "antd";
import { useAutorApiDetail } from "../../app/autor/hooks/useAutorApiDetail";
import { useState, useEffect } from "react";
import { useAutorApiUpdate } from "../../app/autor/hooks/useAutorApiUpdate";
import { AutorUpdateModel } from "../../app/autor/models/autor-update.model";

export const Route = createFileRoute("/autor/$id")({
	component: AssuntoModalIdPage,
});

function AssuntoModalIdPage() {
	const navigate = useNavigate();
	const { id } = Route.useParams();
	const { data } = useAutorApiDetail(id);
	const [nome, setNome] = useState(data?.nome || "");
	const { mutate, isPending } = useAutorApiUpdate({
		onSuccess() {
			back();
		},
	});

	const [errors, setErrors] = useState<Record<string, string[]>>({});

	useEffect(() => {
		if (data) {
			setNome(data.nome);
		}
	}, [data]);

	function save() {
		const autor = { id: Number(id), nome };
		const { success, error, data } = AutorUpdateModel.safeParse(autor);

		setErrors({});

		if (!success) {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			setErrors(error!.flatten().fieldErrors);
			return;
		}

		mutate(data);
	}

	function back() {
		navigate({ to: "/autor", replace: true });
	}

	return (
		<>
			<Modal title="Autor" open onOk={save} onCancel={back} loading={isPending}>
				<Flex gap="middle" align="flex-start">
					<pre>Nome:</pre>
					<Input
						placeholder="Basic usage"
						value={nome}
						onChange={(e) => setNome(e.target.value)}
					/>
				</Flex>
				{errors.descricao?.map((error) => (
					<div key={error} style={{ color: "#c80812" }}>
						{error}
					</div>
				))}
			</Modal>
		</>
	);
}
