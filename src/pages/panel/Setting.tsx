import Container from '../../components/core/Container';
import { useGetUserQuery, useGetUsersQuery } from '../../services/userApi';

const Setting = () => {
	const { data: users, error, isLoading } = useGetUsersQuery();

	console.log('users : ', users);
	return <Container title="Setting">Setting</Container>;
};

export default Setting;
