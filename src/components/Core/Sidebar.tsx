import React from 'react';
import { AppstoreOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const items: MenuProps['items'] = [
	{
		key: 'dashboard',
		icon: React.createElement(AppstoreOutlined),
		label: <Link to={'dashboard'}>Dashboard</Link>,
	},
	{
		key: 'product',
		icon: React.createElement(VideoCameraOutlined),
		label: <Link to={'product'}>Product</Link>,
	},
	{
		key: 'user',
		icon: React.createElement(VideoCameraOutlined),
		label: <Link to={'user'}>User</Link>,
	},
];

const Sidebar = () => {
	// const fullUrl = window.location.href;
	const pathUrl = window.location.pathname;
	const currentPath = pathUrl.split('/');

	return (
		<Sider
			style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
		>
			<div className="demo-logo-vertical" />
			<Menu theme="dark" mode="inline" defaultSelectedKeys={[currentPath[1]]} items={items} />
		</Sider>
	);
};

export default Sidebar;
