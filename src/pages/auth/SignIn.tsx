import { Button, Card, Flex, Form, Input, Space } from 'antd';
import { FormProps } from 'antd/lib';
import { Link, useNavigate } from 'react-router-dom';
import usePersist from '../../hooks/usePersist';
import CenterLayout from '../../layouts/CenterLayout';
import { LOGIN_SCHEMA } from '../../schema/auth-schema';
import validate from '../../schema/validation';
import { useLoginMutation } from '../../services/authApi';
import { setAccessToken } from '../../store/features/authSlice';
import { useAppDispatch } from '../../store/store';

const SignIn = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [persist, setPersist] = usePersist();

	const [login, { isLoading, isError, error, isSuccess, data }] = useLoginMutation();

	if (isError) {
		console.log('SignIn -> error : ', error);
	}

	if (isSuccess) {
		console.log('SignIn -> success : ', data?.access_token);
	}

	const onFinish: FormProps<LoginRequest>['onFinish'] = async (values) => {
		const payload = {
			email: values.email,
			password: values.password,
		};

		try {
			const { access_token } = await login(payload).unwrap();
			setPersist(true);
			dispatch(setAccessToken({ value: access_token }));
			navigate('/dashboard', { replace: true });
		} catch (err) {
			console.log('SignIn -> onFinish -> error : ', err);
		}

		login(payload);
	};

	return (
		<CenterLayout>
			<Card title="Sign In" style={{ minWidth: 400 }}>
				<Form
					name="login"
					initialValues={{
						remember: persist,
						email: 'altiansyahfanny21@gmail.com',
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
