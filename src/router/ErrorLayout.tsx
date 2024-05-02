import { Flex } from 'antd';
import React, { useEffect, useState } from 'react';

interface ErrorLayoutProps {
	children: React.ReactNode;
}

const ErrorLayout = ({ children }: ErrorLayoutProps) => {
	const [minHeight, setMinHeight] = useState(0);

	useEffect(() => {
		const handleResize = () => {
			setMinHeight(window.innerHeight);
		};

		// Set nilai awal minimum tinggi layar
		setMinHeight(window.innerHeight);

		// Tambahkan event listener untuk memperbarui nilai minimum tinggi layar saat perubahan ukuran layar
		window.addEventListener('resize', handleResize);

		// Bersihkan event listener saat komponen tidak lagi digunakan
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return (
		<Flex align="center" justify="center" vertical style={{ minHeight: minHeight }}>
			{children}
		</Flex>
	);
};

export default ErrorLayout;
