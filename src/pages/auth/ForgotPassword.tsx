import { Button, Card, Flex, Form, Input, Space } from 'antd';
import { FormProps } from 'antd/lib';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../api/authApi';
import useNotification from '../../hooks/useNotification';
import CenterLayout from '../../router/CenterLayout';
import { setAlert } from '../../store/features/authSlice';
import { useAppDispatch } from '../../store/store';

type FieldType = {
	email: string;
	password: string;
};

const ForgotPassword = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const notification = useNotification();

	const { mutate, isLoading } = useMutation(forgotPassword, {
		onError() {
			notification.notificationInstance({
				type: 'error',
				message: 'Failed',
				description: 'Failed to response request',
			});
		},
		onSuccess() {
			dispatch(
				setAlert({
					value: {
						error: false,
						message: 'Success',
						description: 'Email was sent to your email, please check your email.',
					},
				})
			);

			navigate('/sign-in', { replace: true });
		},
	});

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		// console.log('values : ', values);
		const payload = { email: values.email };
		mutate(payload);
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<CenterLayout>
			{notification.contextHolder}
			<Card title="Forgot Password" style={{ minWidth: 400 }}>
				<Form
					name="login"
					initialValues={{
						email: 'altiansyahfanny21@gmail.com',
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

					<Form.Item>
						<Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100%' }}>
							Reset Password
						</Button>
					</Form.Item>
				</Form>

				<Flex justify="center">
					<Space direction="vertical" align="center">
						<Link to={'/sign-in'}>Back to sign in.</Link>
					</Space>
				</Flex>
			</Card>
		</CenterLayout>
	);
};

export default ForgotPassword;
