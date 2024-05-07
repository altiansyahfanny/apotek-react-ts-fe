import Title from 'antd/es/typography/Title';
import { useQuery } from 'react-query';
import { verification } from '../../api/authApi';
import SuccessAlert from '../../components/SuccessAlert';
import CenterLayout from '../../router/CenterLayout';

const Verification = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const token = urlParams.get('token');

	const { isError, isSuccess } = useQuery('verification', () => {
		return verification(token);
	});

	if (isError) {
		return <SuccessAlert type="error" message="Failed" description="Failed to verify email." />;
	}

	if (isSuccess) {
		return <SuccessAlert description="Success to verify the email." />;
	}

	return (
		<CenterLayout>
			<Title>Verifiy...</Title>
		</CenterLayout>
	);
};

export default Verification;
