import { TableProps } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { RefObject } from 'react';

export type PaginationType = {
	page: number;
	pageSize: number;
	total: number;
};

export type SorterType<T> = {
	sortColumn: keyof Exclude<T, 'id'> | 'id';
	sortDirection: 'desc' | 'asc';
};

export type OptiosType = {
	value: string;
	label: string;
};

export type TableCustomProps<T> = {
	dataSource: TableProps<T>['dataSource'];
	columns: TableProps<T>['columns'];
	pagination: PaginationType;
	onPaginationChange: (props: HandleChangePaginationProps) => void;
	onChange: TableProps<T>['onChange'];
	loading?: TableProps<T>['loading'];
};

export type FilterActionProps<T> = {
	confirm: FilterDropdownProps['confirm'];
	action?: (params: OnSearchProps<T>) => void;
};

export type HandleSearchProps<T> = FilterActionProps<T> & {
	selectedKeys: string[];
	dataIndex: keyof T;
};

export type OnSearchProps<T> = Omit<HandleSearchProps<T>, keyof FilterActionProps<T>>;

export type HandleChangeInputSearchProps<T> = {
	dataIndex: keyof T;
	value: string | number;
};

export type ColumnSearchProps<T> = {
	dataIndex: keyof T;
	searchInput: RefObject<never>;
	onSearch: (params: OnSearchProps<T>) => void;
	handleChangeInputSearch: (params: HandleChangeInputSearchProps<T>) => void;
	filter: Record<keyof T, string | number>;
	componentInputSearch?: 'input' | 'number' | 'date' | 'option';
	onReset: (params: OnSearchProps<T>) => void;
	options?: OptiosType[];
};

export type HandleChangePaginationProps = Omit<PaginationType, 'total'>;
