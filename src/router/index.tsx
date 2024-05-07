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
import Verification from '../pages/auth/Verification';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

const Router = () => {
	return (
		<Routes>
			<Route element={<Public />}>
				<Route path="/" element={<Welcome />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/verification" element={<Verification />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/reset-password" element={<ResetPassword />} />
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
