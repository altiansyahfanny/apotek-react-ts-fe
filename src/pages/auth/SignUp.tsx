import { Button, Card, Flex, Form, Input, Space } from 'antd';
import { FormProps } from 'antd/lib';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { register } from '../../api/authApi';
import NotificationAlert from '../../components/NotificationAlert';
import { showAxiosResponseErrorToast } from '../../helpers/Toast';
import CenterLayout from '../../layouts/CenterLayout';
import { REGISTER_SCHEMA } from '../../schema/auth-schema';
import validate from '../../schema/validation';

const SignUp = () => {
	const { mutate, isSuccess, isLoading } = useMutation(register, {
		onError: (e: AxiosError<ErrorResponseType>) => {
			showAxiosResponseErrorToast(e);
		},
	});

	const onFinish: FormProps<RegisterRequest>['onFinish'] = (values) => {
		const payload = {
			email: values.email,
			name: values.name,
			password: values.password,
		};
		mutate(payload);
	};

	if (isSuccess) {
		return (
			<NotificationAlert description="Link verification email was sent to your email. Please verify under 5 minute after you receive the email." />
		);
	}

	return (
		<CenterLayout>
			<Card title="Sign Up" style={{ minWidth: 400 }}>
				<Form
					name="register"
					initialValues={{
						remember: true,
						email: 'altiansyahfanny21@gmail.com',
						password: 'rahasia',
						name: 'Altiansyah',
					}}
					onFinish={onFinish}
					autoComplete="off"
					layout="vertical"
				>
					<Form.Item<RegisterRequest>
						label="Name"
						name="name"
						rules={[{ validator: (_, value) => validate({ schema: REGISTER_SCHEMA.name, value }) }]}
					>
						<Input />
					</Form.Item>
					<Form.Item<RegisterRequest>
						label="Email"
						name="email"
						rules={[
							{ validator: (_, value) => validate({ schema: REGISTER_SCHEMA.email, value }) },
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item<RegisterRequest>
						label="Password"
						name="password"
						rules={[
							{ validator: (_, value) => validate({ schema: REGISTER_SCHEMA.password, value }) },
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={isLoading}>
							Sign Up
						</Button>
					</Form.Item>
				</Form>

				<Flex justify="center">
					<Space direction="vertical" align="center">
						<Link to={'/sign-in'}>Already have an account? Sign In</Link>
					</Space>
				</Flex>
			</Card>
		</CenterLayout>
	);
};

export default SignUp;
