import Title from 'antd/lib/typography/Title';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, Outlet } from 'react-router-dom';
import { refreshToken } from '../api/authApi';
import usePersist from '../hooks/usePersist';
import { setAccessToken } from '../store/features/authSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import ErrorLayout from './ErrorLayout';

type RefreshResponseType = { message: string; access_token: string };

type ErrorType = {
	message?: string;
	status?: number;
};

const PersistLogin = () => {
	const dispatch = useAppDispatch();
	const [persist] = usePersist();
	const token = useAppSelector((state) => state.auth.accessToken);
	const effectRan = useRef(false);

	const [trueSuccess, setTrueSuccess] = useState(false);

	const { isLoading, isSuccess, isError, refetch, error } = useQuery(
		'token',
		() => refreshToken(),
		{
			onSuccess: (data) => {
				const responseData: RefreshResponseType = data.data;
				const { access_token } = responseData;
				dispatch(setAccessToken({ value: access_token }));
			},
		}
	);

	const responseError = error as ErrorType;

	useEffect(() => {
		if (effectRan.current === true) {
			// React 18 Strict Mode

			const verifyRefreshToken = async () => {
				console.log('verifying refresh token');
				try {
					await refetch();
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
			<ErrorLayout>
				<Title>Loading...</Title>
			</ErrorLayout>
		);
	} else if (isError) {
		// persist: yes, token: no
		console.error('error');
		content = (
			<ErrorLayout>
				{responseError?.message && <Title>{responseError.message}</Title>}
				<Title level={5}>
					<Link to="/sign-in"> Please login again</Link>
				</Title>
			</ErrorLayout>
		);
	} else if (isSuccess && trueSuccess) {
		// persist: yes, token: yes
		// console.log('success');
		content = <Outlet />;
	} else if (
		token
		// && isUninitialized
	) {
		// persist: yes, token: yes
		// console.log('token and uninit');
		content = <Outlet />;
	}

	return content;
};
export default PersistLogin;
