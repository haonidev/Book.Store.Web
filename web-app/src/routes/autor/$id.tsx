import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Alert, Flex, Input, Modal } from "antd";
import { useAutorApiDetail } from "../../app/autor/hooks/useAutorApiDetail";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/autor/$id")({
    component: AssuntoModalIdPage,
});

function AssuntoModalIdPage() {
    const navigate = useNavigate();
    const { id } = Route.useParams();
    const { data, isLoading, isError } = useAutorApiDetail(id);
    const [nome, setDescricao] = useState(data?.nome || "");

    useEffect(() => {
        if (data) {
            setDescricao(data.nome);
        }
    }, [data]);


    function save() {
        //mutation.mutate(nome);
    }

    function back() {
        navigate({ to: "/autor", replace: true });
    }

    return (
        <>
        <Modal title="Autor" open onOk={save} onCancel={back}>
            <Flex gap="middle" align="flex-start">
                <pre>Descrição:</pre>
                <Input
                    placeholder="Basic usage"
                    value={nome}
                    onChange={(e) => setDescricao(e.target.value)}
                />
            </Flex>
        </Modal>
    </>
    );
}