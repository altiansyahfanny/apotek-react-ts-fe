import { notification } from 'antd';

type NotificationProps = {
	type: 'success' | 'error' | 'info' | 'warning';
	message: string;
	description: string;
};

const useNotification = () => {
	const [notificationApi, contextHolder] = notification.useNotification();

	const notificationInstance = ({ type, description, message }: NotificationProps) => {
		return notificationApi[type]({
			message,
			description,
			type,
			duration: 3,
		});
	};

	return {
		notificationInstance,
		contextHolder,
	};
};

export default useNotification;
