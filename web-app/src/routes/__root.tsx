import React, { useState } from "react";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { createRootRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { FaHome } from "react-icons/fa";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BiBook, BiCart } from "react-icons/bi";

export const Route = createRootRoute({
	component: Root,
});

const { Header, Sider, Content } = Layout;

function Root() {
    const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return (
		<>
			<Layout style={{height: "100vh"}}>
				<Sider trigger={null} collapsible collapsed={collapsed}>
					<div className="demo-logo-vertical" />
					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={["/"]}
                        onSelect={(e) => navigate({to: e.key})}
						items={[
                            {
								key: "/",
								icon: <FaHome />,
								label: "Home",
							},
							{
								key: "/assunto",
								icon: <VideoCameraOutlined />,
								label: "Assunto",
							},
							{
								key: "/autor",
								icon: <UserOutlined />,
								label: "Autor",
							},
							{
								key: "/canal",
								icon: <UploadOutlined />,
								label: "Canal",
							},
                            {
								key: "/livro",
								icon: <BiBook  />,
								label: "Livro",
							},
                            {
								key: "5",
								icon: <BiCart  />,
								label: "Venda",
							},
						]}
					/>
				</Sider>
				<Layout>
					<Header style={{ padding: 0, background: colorBgContainer }}>
						<Button
							type="text"
							icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							onClick={() => setCollapsed(!collapsed)}
							style={{
								fontSize: "16px",
								width: 64,
								height: 64,
							}}
						/>
					</Header>
					<Content
						style={{
							margin: "24px 16px",
							padding: 24,
							minHeight: 280,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						<Outlet />
					</Content>
				</Layout>
			</Layout>
			<TanStackRouterDevtools />
			<ReactQueryDevtools />
		</>
	);
}
