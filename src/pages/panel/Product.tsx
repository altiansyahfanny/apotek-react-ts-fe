import type { GetRef, Input, TableProps } from 'antd';
import { SorterResult } from 'antd/es/table/interface';
import React, { useRef } from 'react';
import Container from '../../components/core/Container';
import TableCustom, { getColumnSearchProps } from '../../components/table/TableCustom';
import {
	setFilterState,
	setPaginationState,
	setSorterState,
} from '../../store/features/productSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { DataSourceType, ProductType } from '../../types/product.types';
import {
	ColumnSearchProps,
	HandleChangeInputSearchProps,
	HandleChangePaginationProps,
	OnSearchProps,
} from '../../types/table.type';

type InputSearchRef = GetRef<typeof Input>;

const data: DataSourceType[] = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		date: '20-02-2024',
		hobbie: 'Futsal',
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		date: '20-02-2024',
		hobbie: 'Volley',
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		date: '20-02-2024',
		hobbie: 'Badminton',
	},
];

const Product: React.FC = () => {
	const dispatch = useAppDispatch();
	const searchInput = useRef<InputSearchRef>(null);

	const productState = useAppSelector((state) => state.product);

	const handleChangePagination = ({ page, pageSize }: HandleChangePaginationProps) => {
		dispatch(setPaginationState({ page, pageSize }));
	};

	const handleTableChange: TableProps<ProductType>['onChange'] = (
		_pagination,
		_filters,
		sorter,
		_extra
	) => {
		const { column, columnKey, ...rest } = sorter as SorterResult<ProductType>;
		dispatch(setSorterState({ value: { ...rest } }));
	};

	const columnSearchProps: Omit<ColumnSearchProps<ProductType>, 'dataIndex'> = {
		searchInput,
		filter: productState.filterState,
		handleChangeInputSearch: ({ dataIndex, value }: HandleChangeInputSearchProps<ProductType>) => {
			dispatch(setFilterState({ key: dataIndex, value }));
		},
		onSearch: (_props: OnSearchProps<ProductType>) => {
			console.log('onSearch -> refetch');
		},
		onReset: ({ dataIndex }: OnSearchProps<ProductType>): void => {
			dispatch(setFilterState({ key: dataIndex, value: '' }));
			console.log('onReset -> refetch');
		},
	};

	const columns: TableProps<ProductType>['columns'] = [
		{
			title: 'Name',
			...getColumnSearchProps({ dataIndex: 'name', ...columnSearchProps }),
			sorter: true,
		},
		{
			title: 'Age',
			...getColumnSearchProps({
				dataIndex: 'age',
				componentInputSearch: 'number',
				...columnSearchProps,
			}),
		},
		{
			title: 'Date',
			...getColumnSearchProps({
				dataIndex: 'date',
				componentInputSearch: 'date',
				...columnSearchProps,
			}),
		},
		{
			title: 'Hobbie',
			...getColumnSearchProps({
				dataIndex: 'hobbie',
				componentInputSearch: 'option',
				options: [
					{
						value: 'Futsal',
						label: 'Futsal',
					},
					{
						value: 'Volley',
						label: 'Volley',
					},
					{
						value: 'Badminton',
						label: 'Badminton',
					},
				],
				...columnSearchProps,
			}),
		},
	];

	return (
		<Container title="Product">
			<TableCustom
				columns={columns}
				dataSource={data}
				onChange={handleTableChange}
				pagination={productState.paginationState}
				onPaginationChange={handleChangePagination}
			/>
		</Container>
	);
};

export default Product;
