import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Alert, Flex, Input, Modal } from "antd";
import { useLivroApiDetail } from "../../app/livro/hooks/useLivroApiDetail";
import { useState } from "react";

export const Route = createFileRoute("/livro/$id")({
    component: LivroModalIdPage,
});

function LivroModalIdPage() {
    const navigate = useNavigate();
    const { id } = Route.useParams();
    const { data, isLoading, isError } = useLivroApiDetail(id);
    const [titulo, setTitulo] = useState(data?.titulo || "");

    function save() {
        //mutation.mutate(descricao);
    }

    function back() {
        navigate({ to: "/livro", replace: true });
    }

    return (
        <>
        <Modal title="Livro" open onOk={save} onCancel={back}>
            <Flex gap="middle" align="flex-start">
                <pre>Descrição:</pre>
                <Input
                    placeholder="Basic usage"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
            </Flex>
        </Modal>
    </>
    );
}