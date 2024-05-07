import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { verification } from '../../api/authApi';
import CenterLayout from '../../router/CenterLayout';
import { useAppDispatch } from '../../store/store';
import Title from 'antd/es/typography/Title';

const Verification = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const urlParams = new URLSearchParams(window.location.search);
	const token = urlParams.get('token');

	const { data } = useQuery(
		'verification',
		() => {
			return verification(token);
		},
		{
			onError: () => {
				// dispatch(setVerificationStatus({ value: false }));
				navigate('/sign-in', { replace: true });
			},
			onSuccess: () => {
				// dispatch(setVerificationStatus({ value: true }));
				navigate('/sign-in', { replace: true });
			},
		}
	);

	return (
		<CenterLayout>
			<Title>Verifiy...</Title>
		</CenterLayout>
	);
};

export default Verification;
