import { Alert, Form, Modal, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getUserById, updateUser } from '../../../api/userApi';
import { setModalState } from '../../../store/features/userSlice';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { UserType } from '../../../types/user.type';
import FormUser from './Form';

interface UpdateUser {
	id: number;
}

const Update: React.FC<UpdateUser> = ({ id }) => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const [form] = Form.useForm();

	const { modalUpdateIsOpen } = useAppSelector((state) => state.user.modalState);

	const { data, isLoading, isSuccess, isError, refetch } = useQuery(
		'userId',
		() => getUserById(id),
		{
			onSuccess: (data) => {
				form.setFieldsValue({
					name: data.name,
					email: data.email,
				});
			},
		}
	);

	useEffect(() => {
		form.resetFields();
		refetch();
	}, [modalUpdateIsOpen]);

	const updateUserMutation = useMutation(
		(payload: { id: number; user: UserType }) => updateUser(payload.id, payload.user),
		{
			onSuccess: () => {
				queryClient.invalidateQueries('user');
				dispatch(setModalState({ value: { modalUpdateIsOpen: false } }));
				form.resetFields();
			},
		}
	);

	const onFinish = async (value: UserType) => {
		updateUserMutation.mutate({ id, user: value });
	};

	const handleCloseModal = () => {
		dispatch(setModalState({ value: { modalUpdateIsOpen: false } }));
	};

	return (
		<Modal
			title={`Update User`}
			open={modalUpdateIsOpen}
			onCancel={handleCloseModal}
			footer={false}
		>
			{isLoading && <Skeleton />}
			{isError && <Alert type="error" message="Fail to fetch data" />}
			{isSuccess && <FormUser form={form} onFinish={onFinish} user={data} />}
		</Modal>
	);
};

export default Update;
