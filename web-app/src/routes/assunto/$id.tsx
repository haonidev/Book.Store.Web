import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Flex, Input, Modal } from "antd";
import { useAssuntoApiDetail } from "../../app/assunto/hooks/useAssuntoApiDetail";
import { useEffect, useState } from "react";
import { AssuntoUpdateModel } from "../../app/assunto/models/assunto-update.model";
import { useAssuntoApiUpdate } from "../../app/assunto/hooks/useAssuntoApiUpdate";

export const Route = createFileRoute("/assunto/$id")({
	component: AssuntoModalIdPage,
});

function AssuntoModalIdPage() {
	const navigate = useNavigate();
	const { id } = Route.useParams();
	const { data } = useAssuntoApiDetail(id);
	const [descricao, setDescricao] = useState(data?.descricao || "");
	const { mutate, isPending } = useAssuntoApiUpdate({
		onSuccess() {
			back();
		},
	});

	const [errors, setErrors] = useState<Record<string, string[]>>({});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setDescricao(data?.descricao || "");
	}, [data?.descricao || ""]);

	function save() {
		const assunto = { id: Number(id), descricao };
		const { success, error, data } = AssuntoUpdateModel.safeParse(assunto);
		console.log(success);
		console.log(error?.flatten());

		setErrors({});

		if (!success) {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			setErrors(error!.flatten().fieldErrors);
			return;
		}

		mutate(data);
	}

	function back() {
		navigate({ to: "/assunto", replace: true });
	}

	return (
		<>
			<Modal title="Assunto" open onOk={save} onCancel={back} loading={isPending}>
				<Flex vertical>
					<Flex gap="middle" align="flex-start">
						<pre>Descrição:</pre>
						<Input
                            disabled={isPending}
							placeholder="Basic usage"
							value={descricao}
							onChange={(e) => setDescricao(e.target.value)}
						/>
					</Flex>
					{errors.descricao?.map((error) => (
						<div key={error} style={{ color: "#c80812" }}>
							{error}
						</div>
					))}
				</Flex>
			</Modal>
		</>
	);
}
