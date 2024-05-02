import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Public = () => {
	const location = useLocation();
	const auth = useAuth();

	// console.log('Public -> auth : ', auth);

	let content;
	if (!auth.role) {
		content = <Outlet />;
	} else {
		content = <Navigate to="/dashboard" state={{ from: location }} replace />;
	}

	return content;
};
export default Public;
