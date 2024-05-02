import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/error/NotFound';
import Welcome from '../pages/public/Welcome';
import DashboardLayout from './DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Product from '../pages/Product';
import User from '../pages/User';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import RequireAuth from './RequiredAuth';
import Forbidden from './Forbidden';
import Public from './Public';
import PersistLogin from './PersistLogin';

const Router = () => {
	return (
		<Routes>
			<Route element={<Public />}>
				<Route path="/" element={<Welcome />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
			</Route>
			<Route element={<PersistLogin />}>
				<Route element={<RequireAuth allowedRoles={['Admin']} />}>
					<Route element={<DashboardLayout />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/product" element={<Product />} />
						<Route path="/user" element={<User />} />
					</Route>
				</Route>
			</Route>
			<Route path="/forbidden" element={<Forbidden />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default Router;
