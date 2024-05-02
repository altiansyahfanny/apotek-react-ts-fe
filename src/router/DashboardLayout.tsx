import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Core/Sidebar';
import Topbar from '../components/Core/Topbar';
import useAuth from '../hooks/useAuth';
import { useAppSelector } from '../store/store';
const { Content, Footer } = Layout;

const DashboardLayout = () => {
	const auth = useAuth();
	const authState = useAppSelector((state) => state.auth);

	// console.log('DashboardLayout -> auth : ', auth);
	// console.log('DashboardLayout -> authState : ', authState);
	return (
		<Layout hasSider>
			<Sidebar />
			<Layout style={{ marginLeft: 200 }}>
				<Topbar />
				<Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
					<Outlet />
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Ant Design ©{new Date().getFullYear()} Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	);
};

export default DashboardLayout;
