import { Alert } from 'antd';
import { useAppSelector } from '../../../store/store';

const AuthAlert = () => {
	const { alert } = useAppSelector((state) => state.auth);

	if (alert) {
		if (alert.error) {
			return (
				<Alert
					message={alert.message}
					description={alert.description}
					type="error"
					closable
					style={{ minWidth: 400 }}
				/>
			);
		} else {
			return (
				<Alert
					message={alert.message}
					description={alert.description}
					type="success"
					closable
					style={{ minWidth: 400 }}
				/>
			);
		}
	}

	return <></>;
};

export default AuthAlert;
