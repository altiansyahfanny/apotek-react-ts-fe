import { Image } from 'antd';
import Title from 'antd/es/typography/Title';
import { useQuery } from 'react-query';
import { getUserProfile } from '../../api/userApi';
import Container from '../../components/core/Container';
import { BASE_URL } from '../../config';

const Profile = () => {
	const { data, isLoading } = useQuery(['user-profile-get'], getUserProfile);

	console.log('data: ', data);

	return (
		<Container title="Profile">
			<Title level={4}>{data?.data?.email}</Title>
			<Image width={200} src={`${BASE_URL}/file/${data?.data?.profilePic}`} />
		</Container>
	);
};

export default Profile;
