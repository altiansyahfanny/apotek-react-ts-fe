import Title from 'antd/lib/typography/Title';
import ErrorLayout from './ErrorLayout';

const Forbidden = () => {
	return (
		<ErrorLayout>
			<Title level={2}>Forbidden</Title>
		</ErrorLayout>
	);
};

export default Forbidden;
