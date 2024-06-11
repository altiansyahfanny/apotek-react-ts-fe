import { jwtDecode } from 'jwt-decode';
import { useAppSelector } from '../store/store';

type DecodedType = {
	email: string;
	iat: number;
	sub: number;
};

const useAuth = () => {
	const { accessToken } = useAppSelector((state) => state.auth);

	let isAdmin = false;

	if (accessToken) {
		const decoded: DecodedType = jwtDecode(accessToken);
		const { email } = decoded;
		const user_role = 'Admin';

		isAdmin = user_role === 'Admin';

		return { email, isAdmin, role: user_role };
	}

	return { email: '', isAdmin, role: '' };
};
export default useAuth;
