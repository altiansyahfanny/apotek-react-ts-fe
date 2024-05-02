import React, { ReactNode } from 'react';
import { Alert, Skeleton } from 'antd';

interface LoadingWrapperProps {
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	children: ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
	isLoading,
	isError,
	isSuccess,
	children,
}: LoadingWrapperProps) => {
	let content: ReactNode = <></>;

	if (isLoading) {
		content = <Skeleton />;
	}

	if (isError) {
		content = (
			<Alert
				message="Terjadi Kesalahan."
				description="Silahkan refresh kembali browse anda."
				type="error"
				showIcon
			/>
		);
	}

	if (isSuccess) {
		content = children;
	}

	return content;
};

export default LoadingWrapper;
