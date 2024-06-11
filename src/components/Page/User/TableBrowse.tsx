import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { GetRef, TableProps } from 'antd';
import { Button, Input, Modal, Space, Tooltip } from 'antd';
import { SorterResult } from 'antd/es/table/interface';
import React, { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteUser } from '../../../api/userApi';
import { transformSorter } from '../../../helpers/TableHelper';
import { useGetUsersQuery } from '../../../services/userApi';
import {
	setFilterState,
	setModalState,
	setPaginationState,
	setSorterState,
} from '../../../store/features/userSlice';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import {
	ColumnSearchProps,
	HandleChangeInputSearchProps,
	HandleChangePaginationProps,
	OnSearchProps,
} from '../../../types/table.type';
import { UserType } from '../../../types/user.type';
import TableCustom, { getColumnSearchProps } from '../../table/TableCustom';
import Update from './Update';

type InputSearchRef = GetRef<typeof Input>;

const TableBrowse: React.FC = () => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const searchInput = useRef<InputSearchRef>(null);

	const [userId, setUserId] = useState(null);

	const userState = useAppSelector((state) => state.user);

	const {
		paginationState: { page, pageSize, total },
		filterState,
		sorterState,
	} = userState;

	const handleChangePagination = ({ page, pageSize }: HandleChangePaginationProps) => {
		dispatch(setPaginationState({ value: { page, pageSize } }));
	};

	const handleTableChange: TableProps<UserType>['onChange'] = (
		_pagination,
		_filters,
		sorter,
		_extra
	) => {
		const { field, order } = sorter as SorterResult<UserType>;
		const newSorter = transformSorter<UserType>(field as keyof UserType, order);
		dispatch(setSorterState({ value: newSorter }));
	};

	const columnSearchProps: Omit<ColumnSearchProps<UserType>, 'dataIndex'> = {
		searchInput,
		filter: userState.filterState,
		handleChangeInputSearch: ({ dataIndex, value }: HandleChangeInputSearchProps<UserType>) => {
			dispatch(setFilterState({ value: { [dataIndex]: value } }));
		},
		onSearch: (_props: OnSearchProps<UserType>) => {
			// refetch();
		},
		onReset: ({ dataIndex }: OnSearchProps<UserType>): void => {
			dispatch(setFilterState({ value: { [dataIndex]: '' } }));
			setTimeout(() => {
				// refetch();
			}, 300);
		},
	};

	const [modal, contextHolder] = Modal.useModal();

	const { mutateAsync, isLoading: isLoadingDelete } = useMutation(deleteUser, {
		onSuccess: () => {
			queryClient.invalidateQueries(['user', page, pageSize, sorterState]);
		},
	});

	const handleDelete = async (userId: number) => {
		try {
			await mutateAsync(userId);
			console.log('User deleted successfully');
		} catch (error) {
			console.error('Error deleting user:', error);
		}
	};

	const confirm = (record: UserType) => {
		modal.confirm({
			title: 'Confirm',
			icon: <ExclamationCircleOutlined />,
			content: 'Delete user?',
			okText: 'Delete',
			cancelText: 'Cancel',
			onOk: (): void => {
				handleDelete(record.id);
			},
		});
	};

	const columns: TableProps<UserType>['columns'] = [
		{
			title: 'Action',
			width: 80,
			fixed: 'left',
			align: 'center',
			render: (record) => (
				<Space>
					<Tooltip title="Edit">
						<Button
							size="small"
							type="primary"
							ghost
							icon={<EditOutlined />}
							onClick={() => {
								setUserId(record.id);
								dispatch(setModalState({ value: { modalUpdateIsOpen: true } }));
							}}
						/>
					</Tooltip>
					<Tooltip title="Delete">
						<Button
							size="small"
							danger
							icon={<DeleteOutlined />}
							onClick={() => confirm(record)}
							loading={isLoadingDelete}
						/>
					</Tooltip>
				</Space>
			),
		},
		{
			title: 'Name',
			...getColumnSearchProps({ dataIndex: 'name', ...columnSearchProps }),
			sorter: true,
		},
		{
			title: 'Email',
			...getColumnSearchProps({
				dataIndex: 'email',
				...columnSearchProps,
			}),
		},
		{
			title: 'Role',
			...getColumnSearchProps({
				dataIndex: 'role',
				componentInputSearch: 'option',
				options: [
					{
						value: 'ADMIN',
						label: 'ADMIN',
					},
					{
						value: 'USER',
						label: 'USER',
					},
				],
				...columnSearchProps,
			}),
		},
	];

	const { data: users, isLoading, isSuccess } = useGetUsersQuery();

	console.log('users : ', users);

	return (
		<>
			<TableCustom
				dataSource={users?.data.map((item, key) => ({ ...item, key }))}
				columns={columns}
				onChange={handleTableChange}
				pagination={{ ...userState.paginationState, total }}
				onPaginationChange={handleChangePagination}
				loading={isLoading}
			/>
			{contextHolder}
			{userId && <Update id={userId} />}
		</>
	);
};

export default TableBrowse;
