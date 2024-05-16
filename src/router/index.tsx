import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/common/NotFound';
import Welcome from '../pages/common/Welcome';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/panel/Dashboard';
import Product from '../pages/panel/Product';
import User from '../pages/panel/User';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import RequireAuth from '../layouts/RequiredAuth';
import Forbidden from '../pages/common/Forbidden';
import Public from '../layouts/Public';
import PersistLogin from '../layouts/PersistLogin';
import Verification from '../pages/auth/Verification';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import Profile from '../pages/panel/Profile';

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
						<Route path="/profile" element={<Profile />} />
					</Route>
				</Route>
			</Route>
			<Route path="/forbidden" element={<Forbidden />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default Router;
