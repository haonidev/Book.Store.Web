import { useCanalApi } from "../app/canal/hooks/useCanalApi";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { Button, List, Skeleton } from "antd";

export const Route = createFileRoute("/canal")({
	component: CanalIndexPage,
});

function CanalIndexPage() {
	const { data, isLoading, isError } = useCanalApi();
	const navigate = useNavigate();
	function goToCanal(id: string) {
		navigate({ to: "/canal/$id", params: { id } });
	}
	return (
		<>
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
								<Button key={"Excluir"} type="dashed" danger>
									Excluir
								</Button>,
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
