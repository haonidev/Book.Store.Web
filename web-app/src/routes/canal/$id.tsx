import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Alert, Flex, Input, Modal } from "antd";
import { useCanalApiDetail } from "../../app/canal/hooks/useCanalApiDetail";
import { useState } from "react";

export const Route = createFileRoute("/canal/$id")({
    component: CanalModalIdPage,
});

function CanalModalIdPage() {
    const navigate = useNavigate();
    const { id } = Route.useParams();
    const { data, isLoading, isError } = useCanalApiDetail(id);
    const [descricao, setDescricao] = useState(data?.descricao || "");

    function save() {
        //mutation.mutate(descricao);
    }

    function back() {
        navigate({ to: "/canal", replace: true });
    }

    return (
        <>
        <Modal title="Canal" open onOk={save} onCancel={back}>
            <Flex gap="middle" align="flex-start">
                <pre>Descrição:</pre>
                <Input
                    placeholder="Basic usage"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
            </Flex>
        </Modal>
    </>
    );
}