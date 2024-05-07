import React from 'react';
import CenterLayout from '../router/CenterLayout';
import { Alert, AlertProps, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Text } = Typography;

interface SuccessAlertProps {
	type?: AlertProps['type'];
	message?: string;
	description: string;
	link?: string;
	linkDescription?: string;
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({
	type = 'success',
	message = 'Success',
	description,
	link = '/sign-in',
	linkDescription = 'Back to Sign In page',
}) => {
	return (
		<CenterLayout>
			<Space direction="vertical" size={'middle'} align="center">
				<Alert
					type={type}
					message={message}
					description={description}
					showIcon
					style={{ minWidth: 500 }}
				/>
				<Text>
					<Link to={link}>{linkDescription}</Link>
				</Text>
			</Space>
		</CenterLayout>
	);
};

export default SuccessAlert;
