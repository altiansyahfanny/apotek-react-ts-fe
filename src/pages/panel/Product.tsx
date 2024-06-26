import { GetRef, Input, TableProps } from 'antd';
import { SorterResult } from 'antd/lib/table/interface';
import { useRef } from 'react';
import Container from '../../components/core/Container';
import TableCustom, { getColumnSearchProps } from '../../components/table/TableCustom';
import {
	setFilterState,
	setPaginationState,
	setSorterState,
} from '../../store/features/productSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { ProductSearchType, ProductType } from '../../types/product.type';
import {
	ColumnSearchProps,
	HandleChangeInputSearchProps,
	HandleChangePaginationProps,
	OnSearchProps,
} from '../../types/table.type';
import { useQuery } from 'react-query';
import { getProduct } from '../../api/productApi';

type InputSearchRef = GetRef<typeof Input>;

const Product = () => {
	const dispatch = useAppDispatch();
	const searchInput = useRef<InputSearchRef>(null);

	const productState = useAppSelector((state) => state.product);

	const {
		paginationState: { page, pageSize },
		filterState,
		sorterState,
	} = productState;

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

	const columnSearchProps: Omit<ColumnSearchProps<ProductSearchType>, 'dataIndex'> = {
		searchInput,
		filter: productState.filterState,
		handleChangeInputSearch: ({
			dataIndex,
			value,
		}: HandleChangeInputSearchProps<ProductSearchType>) => {
			dispatch(setFilterState({ key: dataIndex, value }));
		},
		onSearch: (_props: OnSearchProps<ProductType>) => {
			console.log('onSearch -> refetch');
			refetch();
		},
		onReset: ({ dataIndex }: OnSearchProps<ProductSearchType>): void => {
			console.log('onReset -> refetch');
			dispatch(setFilterState({ key: dataIndex, value: '' }));
			setTimeout(() => {
				refetch();
			}, 300);
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
				dataIndex: 'stock',
				componentInputSearch: 'number',
				...columnSearchProps,
			}),
		},
		{
			title: 'Date',
			...getColumnSearchProps({
				dataIndex: 'price',
				componentInputSearch: 'date',
				...columnSearchProps,
			}),
		},
	];

	const { data, isLoading, refetch } = useQuery(
		['product', page, pageSize, sorterState],
		() => {
			return getProduct({ page, pageSize, filter: filterState, sort: sorterState });
		},
		{
			onSuccess: (data) => {
				dispatch(setPaginationState({ value: { total: data.paging.total } }));
			},
		}
	);

	return (
		<Container title="Product">
			<TableCustom
				columns={columns}
				dataSource={data?.data.map((item, key) => ({ ...item, key }))}
				onChange={handleTableChange}
				pagination={productState.paginationState}
				onPaginationChange={handleChangePagination}
				loading={isLoading}
			/>
		</Container>
	);
};

export default Product;
