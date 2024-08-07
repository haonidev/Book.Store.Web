import { useCanalApi } from "../app/canal/hooks/useCanalApi";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { Button, List, Popconfirm, Skeleton } from "antd";
import { useCanalApiDelete } from "../app/canal/hooks/useCanalApiDelete";

export const Route = createFileRoute("/canal")({
	component: CanalIndexPage,
});

function CanalIndexPage() {
	const { data, isLoading, isError } = useCanalApi();
	const navigate = useNavigate();

	function goToCanal(id: string) {
		navigate({ to: "/canal/$id", params: { id } });
	}

	function goToNovoCanal() {
		navigate({ to: "/canal/create" });
	}

	const { mutate } = useCanalApiDelete();

	const handleClickExcluir = (id: string) => {
		mutate({ id });
	};

	return (
		<>
			<Button key={"Novo"} type="primary" onClick={() => goToNovoCanal()}>
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
									onClick={() => goToCanal(item.id.toString())}
								>
									Editar
								</Button>,
								<Popconfirm
									key={item.id}
									title="Excluir Canal"
									description="Deseja excluir o canal?"
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
