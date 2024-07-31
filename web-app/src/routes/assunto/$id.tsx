import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Alert, Flex, Input, Modal } from "antd";
import { useAssuntoApiDetail } from "../../app/assunto/hooks/useAssuntoApiDetail";
import { useState } from "react";

export const Route = createFileRoute("/assunto/$id")({
    component: AssuntoModalIdPage,
});

function AssuntoModalIdPage() {
    const navigate = useNavigate();
    const { id } = Route.useParams();
    const { data, isLoading, isError } = useAssuntoApiDetail(id);
    const [descricao, setDescricao] = useState(data?.descricao || "");

    function save() {
        //mutation.mutate(descricao);
    }

    function back() {
        navigate({ to: "/assunto", replace: true });
    }

    return (
        <>
        <Modal title="Assunto" open onOk={save} onCancel={back}>
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