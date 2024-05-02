import {
	BellOutlined,
	DollarCircleOutlined,
	LogoutOutlined,
	MessageOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Flex, Layout, MenuProps, theme } from 'antd';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../api/authApi';
import { setAccessToken } from '../../store/features/authSlice';
import { useAppDispatch } from '../../store/store';
const { Header } = Layout;

const Topbar = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const logoutMutation = useMutation(logout, {
		onSuccess: () => {
			navigate('/sign-in', { replace: true });
		},
	});

	const handleLogout = () => {
		dispatch(setAccessToken({ value: null }));
		logoutMutation.mutate();
	};

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<Flex gap={8} align="center">
					<UserOutlined />
					<Link to={'/'} style={{ color: 'black' }}>
						Profile
					</Link>
				</Flex>
			),
		},
		{
			key: '2',
			label: (
				<Flex gap={8} align="center">
					<DollarCircleOutlined />
					<Link to={'/sign-in'} style={{ color: 'black' }}>
						Subscribtions
					</Link>
				</Flex>
			),
		},
		{
			key: '3',
			label: (
				<Flex gap={8} align="center" onClick={handleLogout}>
					<LogoutOutlined />
					Logout
				</Flex>
			),
		},
	];
	return (
		<Header style={{ padding: 0, background: colorBgContainer }}>
			<Flex justify="end" style={{ padding: 16 }} gap={16}>
				<BellOutlined />
				<MessageOutlined />
				<Dropdown menu={{ items }} placement="bottomRight">
					<Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
				</Dropdown>
			</Flex>
		</Header>
	);
};

export default Topbar;
