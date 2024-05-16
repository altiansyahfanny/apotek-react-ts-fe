import { Link, useNavigate } from 'react-router-dom';
import CenterLayout from '../../layouts/CenterLayout';
import { Button, Card, Flex, Form, Input, Space } from 'antd';
import { FormProps } from 'antd/lib';
import { useMutation } from 'react-query';
import { resetPassword } from '../../api/authApi';
import useNotification from '../../hooks/useNotification';

type FieldType = {
	new_password: string;
	confirm_password: string;
};

const ResetPassword = () => {
	const navigate = useNavigate();
	const notification = useNotification();
	const urlParams = new URLSearchParams(window.location.search);
	const token = urlParams.get('token');

	const resetPasswordMutation = useMutation(resetPassword, {
		onError() {
			notification.notificationInstance({
				type: 'error',
				message: 'Failed',
				description: 'Failed to reset password',
			});
		},
		onSuccess() {
			notification.notificationInstance({
				type: 'success',
				message: 'Success',
				description: 'Success to reset password',
			});

			navigate('/sign-in', { replace: true });
		},
	});

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		// console.log('values : ', values);
		// return;
		if (token) {
			if (values.confirm_password === values.new_password) {
				const payload = { token, password: values.confirm_password };
				resetPasswordMutation.mutate(payload);
			} else {
				notification.notificationInstance({
					type: 'error',
					message: 'Failed',
					description: 'Password unmatch',
				});
			}
		} else {
			notification.notificationInstance({
				type: 'error',
				message: 'Failed',
				description: 'Invalid token',
			});
		}
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<CenterLayout>
			{notification.contextHolder}
			<Card title="Reset Password" style={{ minWidth: 400 }}>
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
						label="New Password"
						name="new_password"
						rules={[{ required: true }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<FieldType>
						label="Confirm Password"
						name="confirm_password"
						rules={[{ required: true }]}
					>
						<Input />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" style={{ width: '100%' }}>
							Change Password
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

export default ResetPassword;
