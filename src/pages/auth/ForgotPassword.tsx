import { Button, Card, Flex, Form, Input, Space } from 'antd';
import { FormProps } from 'antd/lib';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../api/authApi';
import SuccessAlert from '../../components/SuccessAlert';
import { showAxiosResponseErrorToast } from '../../helpers/Toast';
import CenterLayout from '../../router/CenterLayout';
import { FORGOT_PASSWORD_SCHEMA } from '../../schema/auth-schema';
import validate from '../../schema/validation';

const ForgotPassword = () => {
	const { mutate, isLoading, isSuccess } = useMutation(forgotPassword, {
		onError: (e: AxiosError<ErrorResponse>) => {
			showAxiosResponseErrorToast(e);
		},
	});

	const onFinish: FormProps<ForgotPasswordRequest>['onFinish'] = (values) => {
		const payload = { email: values.email };
		mutate(payload);
	};

	if (isSuccess) {
		return (
			<SuccessAlert description="Reset password link was sent to your email. Please do reset password under 5 minute after you receive the email." />
		);
	}

	return (
		<CenterLayout>
			<Card title="Forgot Password" style={{ minWidth: 400 }}>
				<Form
					name="login"
					initialValues={{
						email: 'altiansyahfanny21@gmail.com',
					}}
					onFinish={onFinish}
					autoComplete="off"
					layout="vertical"
				>
					<Form.Item<ForgotPasswordRequest>
						label="Email"
						name="email"
						rules={[
							{
								validator: (_, value) => validate({ schema: FORGOT_PASSWORD_SCHEMA.email, value }),
							},
						]}
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
