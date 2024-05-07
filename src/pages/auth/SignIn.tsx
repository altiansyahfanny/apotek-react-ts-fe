import { Button, Card, Flex, Form, Input, Space } from 'antd';
import { FormProps } from 'antd/lib';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';
import { showAxiosResponseErrorToast } from '../../helpers/Toast';
import usePersist from '../../hooks/usePersist';
import { LOGIN_SCHEMA } from '../../schema/auth-schema';
import validate from '../../schema/validation';
import { setAccessToken } from '../../store/features/authSlice';
import { useAppDispatch } from '../../store/store';
import CenterLayout from '../../router/CenterLayout';

const SignIn = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [persist, setPersist] = usePersist();

	const { mutate, isLoading } = useMutation(login, {
		onError: (e: AxiosError<ErrorResponse>) => {
			showAxiosResponseErrorToast(e);
		},
		onSuccess: (data: AxiosResponse<LoginResponse>) => {
			const { access_token } = data.data;

			setPersist(true);
			dispatch(setAccessToken({ value: access_token }));
			navigate('/dashboard', { replace: true });
		},
	});

	const onFinish: FormProps<LoginRequest>['onFinish'] = (values) => {
		const payload = {
			email: values.email,
			password: values.password,
		};
		mutate(payload);
	};

	return (
		<CenterLayout>
			<Card title="Sign In" style={{ minWidth: 400 }}>
				<Form
					name="login"
					initialValues={{
						remember: persist,
						email: 'altiansyahfanny21@gmail.co',
						password: 'rahasia',
					}}
					onFinish={onFinish}
					autoComplete="off"
					layout="vertical"
				>
					<Form.Item<LoginRequest>
						label="Email"
						name="email"
						rules={[{ validator: (_, value) => validate({ schema: LOGIN_SCHEMA.email, value }) }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<LoginRequest>
						label="Password"
						name="password"
						rules={[
							{ validator: (_, value) => validate({ schema: LOGIN_SCHEMA.password, value }) },
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={isLoading}>
							Sign In
						</Button>
					</Form.Item>
				</Form>

				<Flex justify="center">
					<Space direction="vertical" align="center">
						<Link to={'/forgot-password'}>Forgot password</Link>
						<Link to={'/sign-up'}>Don't have an account? Sign Up</Link>
					</Space>
				</Flex>
			</Card>
		</CenterLayout>
	);
};

export default SignIn;
