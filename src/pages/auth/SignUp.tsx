import { Button, Card, Flex, Form, Input, Space } from 'antd';
import { FormProps } from 'antd/lib';
import { Link } from 'react-router-dom';

const SignUp = () => {
	type FieldType = {
		email?: string;
		password?: string;
	};

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
			<Card title="Sign Up" style={{ minWidth: 400 }}>
				<Form
					name="register"
					initialValues={{ remember: true, email: 'altiansyah21@gmail.com' }}
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
		</Flex>
	);
};

export default SignUp;
