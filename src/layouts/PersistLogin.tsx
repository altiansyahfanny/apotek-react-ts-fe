import Title from 'antd/lib/typography/Title';
import { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import usePersist from '../hooks/usePersist';
import { useRefreshMutation } from '../services/authApi';
import { useAppSelector } from '../store/store';
import CenterLayout from './CenterLayout';

const PersistLogin = () => {
	const [persist] = usePersist();
	const token = useAppSelector((state) => state.auth.accessToken);
	const effectRan = useRef(false);

	const [trueSuccess, setTrueSuccess] = useState(false);

	//
	const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] = useRefreshMutation();

	console.log('PersistLogin -> error : ', error);

	useEffect(() => {
		if (effectRan.current === true) {
			// React 18 Strict Mode

			const verifyRefreshToken = async () => {
				console.log('verifying refresh token');
				try {
					await refresh();
					setTrueSuccess(true);
				} catch (err) {
					console.error(err);
				}
			};

			if (!token && persist) verifyRefreshToken();
		}

		return () => {
			effectRan.current = true;
		};

		// eslint-disable-next-line
	}, []);

	let content;
	if (!persist) {
		// persist: no
		// console.log('no persist');
		content = <Outlet />;
	} else if (isLoading) {
		// persist: yes, token: no
		// console.log('loading');
		content = (
			<CenterLayout>
				<Title>Loading...</Title>
			</CenterLayout>
		);
	} else if (isError) {
		// persist: yes, token: no
		// console.log('error');
		content = (
			<CenterLayout>
				{/* <Title> {`${error?.data?.message} - `}</Title> */}
				<Title level={5}>
					<Link to="/sign-in"> Please login again</Link>
				</Title>
			</CenterLayout>
		);
	} else if (isSuccess && trueSuccess) {
		// persist: yes, token: yes
		// console.log('success');
		content = <Outlet />;
	} else if (token && isUninitialized) {
		// persist: yes, token: yes
		// console.log('token and uninit');
		content = <Outlet />;
	}

	return content;
};
export default PersistLogin;
