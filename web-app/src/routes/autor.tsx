import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useAutorApi } from "../app/autor/hooks/useAutorApi";
import { Button, List, Skeleton } from "antd";

export const Route = createFileRoute("/autor")({
	component: AutorIndexPage,
});

function AutorIndexPage() {
	const { data, isLoading, isError } = useAutorApi();
	const navigate = useNavigate();
	function goToAutor(id: string) {
		navigate({ to: "/autor/$id", params: { id } });
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
									onClick={() => goToAutor(item.id.toString())}
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
