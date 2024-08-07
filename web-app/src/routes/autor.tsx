import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useAutorApi } from "../app/autor/hooks/useAutorApi";
import { Button, List, Popconfirm, Skeleton } from "antd";
import { useAutorApiDelete } from "../app/autor/hooks/useAutorApiDelete";

export const Route = createFileRoute("/autor")({
	component: AutorIndexPage,
});

function AutorIndexPage() {
	const { data, isLoading, isError } = useAutorApi();
	const navigate = useNavigate();
	function goToAutor(id: string) {
		navigate({ to: "/autor/$id", params: { id } });
	}

	function goToNovoAutor() {
		navigate({ to: "/autor/create" });
	}

	const { mutate } = useAutorApiDelete();

	const handleClickExcluir = (id: string) => {
		mutate({ id });
	};

	return (
		<>
			<Button 
				key={"Novo"} 
				type="primary" 
				onClick={() => goToNovoAutor()}
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
									onClick={() => goToAutor(item.id.toString())}
								>
									Editar
								</Button>,
								<Popconfirm
									key={item.id}
									title="Excluir Autor"
									description="Deseja excluir o autor?"
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
								<div>{item.nome}</div>
							</Skeleton>
						</List.Item>
					)}
				/>
			</div>
			<Outlet />
		</>
	);
}
