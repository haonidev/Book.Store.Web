import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useAssuntoApi } from "../app/assunto/hooks/useAssuntoApi";
import { useAssuntoApiDelete } from "../app/assunto/hooks/useAssuntoApiDelete";
import { Button, List, Skeleton } from "antd";
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

export const Route = createFileRoute("/assunto")({
	component: AssuntoIndexPage,
});

function AssuntoIndexPage() {
	const { data, isLoading, isError } = useAssuntoApi();
	const navigate = useNavigate();
	function goToAssunto(id: string) {
		navigate({ to: "/assunto/$id", params: { id } });
	}

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: useAssuntoApiDelete,
		onSuccess: () => {
		  console.log('Item excluído com sucesso!');
		  toast.success('Item excluído com sucesso!');
		  queryClient.invalidateQueries("assuntos");
		},
		onError: (error) => {
		  console.error('Erro ao excluir item:', error);
		  toast.error(`Erro ao excluir item: ${error.message}`);
		},
	  });

	  const handleClickExcluir = (id: string) => {
		mutation.mutate(id);
	  };

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
									onClick={() => goToAssunto(item.id.toString())}
								>
									Editar
								</Button>,
								<Button key={"Excluir"} type="dashed" danger 
									onClick={ () => handleClickExcluir(item.id.toString()) }
									disabled={mutation.isLoading}>
									{mutation.isLoading ? 'Excluindo...' : 'Excluir'}
								</Button>,
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
