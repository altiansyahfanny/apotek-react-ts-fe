import React from 'react';
import Container from '../../components/core/Container';
import Create from '../../components/page/user/Create';
import TableBrowse from '../../components/page/user/TableBrowse';
import { setModalState } from '../../store/features/userSlice';
import { useAppDispatch } from '../../store/store';

const User: React.FC = () => {
	const dispatch = useAppDispatch();

	return (
		<Container
			title="User"
			actionButtons={[
				{
					type: 'primary',
					children: 'User',
					onClick: () => dispatch(setModalState({ value: { modalAddIsOpen: true } })),
					purpose: 'create',
				},
			]}
		>
			<TableBrowse />
			<Create />
		</Container>
	);
};

export default User;
