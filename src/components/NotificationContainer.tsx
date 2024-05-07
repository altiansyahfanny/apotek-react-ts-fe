import { notification } from 'antd';
import React from 'react';

const NotificationContainer = () => {
	const [notificationApi, contextHolder] = notification.useNotification();
	return <div>NotificationContainer</div>;
};

export default NotificationContainer;
