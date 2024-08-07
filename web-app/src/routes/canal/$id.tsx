import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Flex, Input, Modal } from "antd";
import { useCanalApiDetail } from "../../app/canal/hooks/useCanalApiDetail";
import { useEffect, useState } from "react";
import { useCanalApiUpdate } from "../../app/canal/hooks/useCanalApiUpdate";
import { CanalUpdateModel } from "../../app/canal/models/canal-update.model";

export const Route = createFileRoute("/canal/$id")({
    component: CanalModalIdPage,
});

function CanalModalIdPage() {
    const navigate = useNavigate();
    const { id } = Route.useParams();
    const { data } = useCanalApiDetail(id);
    const [nome, setNome] = useState(data?.nome || "");
    const { mutate, isPending } = useCanalApiUpdate({
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
		const canal = { id: Number(id), nome };
		const { success, error, data } = CanalUpdateModel.safeParse(canal);

		setErrors({});

		if (!success) {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			setErrors(error!.flatten().fieldErrors);
			return;
		}

		mutate(data);
	}

    function back() {
        navigate({ to: "/canal", replace: true });
    }

    return (
		<>
			<Modal title="Canal" open onOk={save} onCancel={back} loading={isPending}>
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