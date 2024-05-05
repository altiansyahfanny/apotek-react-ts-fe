import { Button, Card, Flex, Form, Input, Space } from 'antd';
import { FormProps } from 'antd/lib';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';
import useNotification from '../../hooks/useNotification';
import usePersist from '../../hooks/usePersist';
import { setAccessToken } from '../../store/features/authSlice';
import { useAppDispatch } from '../../store/store';

type FieldType = {
	email: string;
	password: string;
};

type LoginResponseType = { message: string; access_token: string };

interface MyResponse {
	errors?: string;
}

const SignIn = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const notification = useNotification();
	const [persist, setPersist] = usePersist();

	const loginMutation = useMutation(login, {
		onError: (error: AxiosError<MyResponse>) => {
			if (error.response?.data.errors) {
				notification.notificationInstance({
					type: 'error',
					message: 'Failed',
					description: error.response?.data.errors,
				});
			} else {
				notification.notificationInstance({
					type: 'error',
					message: 'Failed',
					description: 'Internal Server Error',
				});
			}
		},
		onSuccess: (data: AxiosResponse<LoginResponseType>) => {
			const { access_token } = data.data;

			dispatch(setAccessToken({ value: access_token }));
			navigate('/dashboard', { replace: true });
		},
	});

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		setPersist(true);
		const payload = {
			email: values.email,
			password: values.password,
		};
		loginMutation.mutate(payload);
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
			{notification.contextHolder}
			<Card title="Sign In" style={{ minWidth: 400 }}>
				<Form
					name="login"
					initialValues={{
						remember: persist,
						email: 'altiansyah21@gmail.com',
						password: 'rahasia',
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					layout="vertical"
				>
					<Form.Item<FieldType>
						label="Email"
						name="email"
						rules={[{ required: true, message: 'Please input your email!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<FieldType>
						label="Password"
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" style={{ width: '100%' }}>
							Sign In
						</Button>
					</Form.Item>
				</Form>

				<Flex justify="center">
					<Space direction="vertical" align="center">
						<Link to={'/'}>Forgot password</Link>
						<Link to={'/sign-up'}>Don't have an account? Sign Up</Link>
					</Space>
				</Flex>
			</Card>
		</Flex>
	);
};

export default SignIn;
