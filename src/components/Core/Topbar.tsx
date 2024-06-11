import {
	BellOutlined,
	DollarCircleOutlined,
	LogoutOutlined,
	MessageOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Flex, Layout, MenuProps, theme } from 'antd';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { useSendLogoutMutation } from '../../services/authApi';
import { useGetUserProfileQuery } from '../../services/userApi';
import { setAccessToken } from '../../store/features/authSlice';
import { useAppDispatch } from '../../store/store';
const { Header } = Layout;

const Topbar = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { data: user, isSuccess: isSuccessUser } = useGetUserProfileQuery();

	const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

	useEffect(() => {
		if (isSuccess) navigate('/sign-in');
	}, [isSuccess, navigate]);

	const handleLogout = () => {
		dispatch(setAccessToken({ value: null }));
		sendLogout();
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
					<Link to={'/profile'} style={{ color: 'black' }}>
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

	let content = <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />;

	if (isSuccessUser) {
		if (user.profilePic) {
			content = (
				<Avatar style={{ cursor: 'pointer' }} src={`${BASE_URL}/file/${user.profilePic}`} />
			);
		}
	}

	return (
		<Header style={{ padding: 0, background: colorBgContainer }}>
			<Flex justify="end" style={{ padding: 16 }} gap={16}>
				<BellOutlined />
				<MessageOutlined />
				<Dropdown menu={{ items }} placement="bottomRight">
					{content}
				</Dropdown>
			</Flex>
		</Header>
	);
};

export default Topbar;
