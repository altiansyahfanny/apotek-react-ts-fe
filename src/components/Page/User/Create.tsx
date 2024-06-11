import { Form, Modal } from 'antd';
import React, { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
// import { addUser } from '../../../api/userApi';
import { setModalState } from '../../../store/features/userSlice';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { UserType } from '../../../types/user.type';
import FormUser from './Form';
import { useAddUserMutation } from '../../../services/userApi';

const Create: React.FC = () => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const [form] = Form.useForm();

	const { modalAddIsOpen } = useAppSelector((state) => state.user.modalState);

	useEffect(() => {
		form.resetFields();
	}, [modalAddIsOpen]);

	// const addUserMutation = useMutation(addUser, {
	// 	onSuccess: () => {
	// 		queryClient.invalidateQueries('user');
	// 		dispatch(setModalState({ value: { modalAddIsOpen: false } }));
	// 		form.resetFields();
	// 	},
	// });

	const [addUser] = useAddUserMutation();

	const onFinish = (value: UserType) => {
		// addUserMutation.mutate({ ...value, password: 'password' });
		addUser(value);
	};

	const handleCloseModal = () => {
		dispatch(setModalState({ value: { modalAddIsOpen: false } }));
	};

	return (
		<Modal title="Create User" open={modalAddIsOpen} onCancel={handleCloseModal} footer={false}>
			<FormUser form={form} onFinish={onFinish} />;
		</Modal>
	);
};

export default Create;
