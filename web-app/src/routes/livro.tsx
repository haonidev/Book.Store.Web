import { useLivroApi } from "../app/livro/hooks/useLivroApi";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { Button, List, Skeleton } from "antd";

export const Route = createFileRoute("/livro")({
	component: LivroIndexPage,
});

function LivroIndexPage() {
	const { data, isLoading, isError } = useLivroApi();
	const navigate = useNavigate();
	function goToLivro(id: string) {
		navigate({ to: "/livro/$id", params: { id } });
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
									onClick={() => goToLivro(item.id.toString())}
								>
									Editar
								</Button>,
								<Button key={"Excluir"} type="dashed" danger>
									Excluir
								</Button>,
							]}
						>
							<Skeleton avatar title={false} loading={isLoading} active>
								<div>{item.titulo}</div>
							</Skeleton>
						</List.Item>
					)}
				/>
			</div>
			<Outlet />
		</>
	);
}
