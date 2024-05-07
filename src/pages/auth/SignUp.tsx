import { Button, Card, Flex, Form, Input, Space } from 'antd';
import { FormProps } from 'antd/lib';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../api/authApi';
import { AxiosError } from 'axios';
import useNotification from '../../hooks/useNotification';

type FieldType = {
	name: string;
	email: string;
	password: string;
};

interface MyResponse {
	errors?: string;
}

const SignUp = () => {
	const navigate = useNavigate();
	const notification = useNotification();

	const registerMutation = useMutation(register, {
		onError: (error: AxiosError<MyResponse>) => {
			console.log('error : ', error);
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
		onSuccess: (data: any) => {
			console.log('data : ', data);
			navigate('/sign-in', { replace: true });
		},
	});

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		const payload = {
			email: values.email,
			name: values.name,
			password: values.password,
		};
		registerMutation.mutate(payload);
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
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
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					layout="vertical"
				>
					<Form.Item<FieldType>
						label="Name"
						name="name"
						rules={[{ required: true, message: 'Please input your name!' }]}
					>
						<Input />
					</Form.Item>
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
			{notification.contextHolder}
		</Flex>
	);
};

export default SignUp;
