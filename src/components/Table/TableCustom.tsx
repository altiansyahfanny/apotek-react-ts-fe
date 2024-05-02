import { SearchOutlined } from '@ant-design/icons';
import { Space, Table, TableColumnType } from 'antd';
import { Fragment } from 'react';
import { ColumnSearchProps, HandleSearchProps, TableCustomProps } from '../../types/table.type';
import Pagination from './Pagination';
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';

export const handleSearch = <T extends {}>({
	confirm,
	dataIndex,
	selectedKeys,
	action,
}: HandleSearchProps<T>) => {
	if (action) action({ selectedKeys, dataIndex });
	confirm();
};

export const handleReset = <T extends {}>({
	confirm,
	dataIndex,
	selectedKeys,
	action,
}: HandleSearchProps<T>) => {
	if (action) action({ selectedKeys, dataIndex });
	confirm();
};

export const getColumnSearchProps = <T extends {}>({
	dataIndex,
	searchInput,
	onReset,
	onSearch,
	handleChangeInputSearch,
	filter,
	componentInputSearch,
	options,
}: ColumnSearchProps<T>): TableColumnType<T> => {
	return {
		key: String(dataIndex),
		dataIndex: String(dataIndex),
		filterDropdown: ({ selectedKeys, confirm, clearFilters }) => (
			<Space style={{ padding: 8 }} direction="vertical" onKeyDown={(e) => e.stopPropagation()}>
				<SearchInput
					{...{
						confirm,
						dataIndex,
						filter,
						handleChangeInputSearch,
						onSearch,
						searchInput,
						selectedKeys: selectedKeys as string[],
						componentInputSearch,
						options,
					}}
				/>
				<SearchButton
					{...{
						clearFilters,
						confirm,
						dataIndex,
						onReset,
						onSearch,
						selectedKeys,
					}}
				/>
			</Space>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
		),
		onFilter: (value, record) =>
			String(record[dataIndex])
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => (searchInput?.current as HTMLInputElement | null)?.focus(), 100);
			}
		},
	};
};

const TableCustom = <T extends {}>({
	dataSource,
	columns,
	onChange,
	pagination,
	onPaginationChange,
	loading = false,
}: TableCustomProps<T>) => {
	return (
		<Fragment>
			<Table
				columns={columns}
				dataSource={dataSource}
				bordered
				scroll={{ x: 'max-content' }}
				pagination={false}
				onChange={onChange}
				loading={loading}
				size="middle"
			/>
			<Pagination {...{ pagination, onPaginationChange, disabled: loading as boolean }} />
		</Fragment>
	);
};

export default TableCustom;
