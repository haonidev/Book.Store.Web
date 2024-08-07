import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, List, Popconfirm, Skeleton } from "antd";
import { useAssuntoApi } from "../app/assunto/hooks/useAssuntoApi";
import { useAssuntoApiDelete } from "../app/assunto/hooks/useAssuntoApiDelete";

export const Route = createFileRoute("/assunto")({
	component: AssuntoIndexPage,
});

function AssuntoIndexPage() {
	const { data, isLoading, isError } = useAssuntoApi();
	const navigate = useNavigate();
	function goToAssunto(id: string) {
		navigate({ to: "/assunto/$id", params: { id } });
	}

	function goToNovoAssunto() {
		navigate({ to: "/assunto/create" });
	}

	const { mutate } = useAssuntoApiDelete();

	const handleClickExcluir = (id: string) => {
		mutate({ id });
	};

	return (
		<>
			<Button
				key={"Novo"}
				type="primary"
				onClick={() => goToNovoAssunto()}
			>
				Novo
			</Button>
			<div>
				<List
					loading={isLoading}
					itemLayout="horizontal"
					dataSource={data}
					renderItem={(item) => (
						<List.Item
							actions={[
								<Button
									key={"Editar"}
									type="primary"
									onClick={() => goToAssunto(item.id.toString())}
								>
									Editar
								</Button>,
								<Popconfirm
									key={item.id}
									title="Excluir Assunto"
									description="Deseja excluir o assunto?"
									onConfirm={() => handleClickExcluir(item.id.toString())}
									okText="Sim"
									cancelText="Não"
								>
									<Button type="dashed" danger>
										"Excluir"
									</Button>
								</Popconfirm>,
							]}
						>
							<Skeleton avatar title={false} loading={isLoading} active>
								<div>{item.descricao}</div>
							</Skeleton>
						</List.Item>
					)}
				/>
			</div>
			<Outlet />
		</>
	);
}
