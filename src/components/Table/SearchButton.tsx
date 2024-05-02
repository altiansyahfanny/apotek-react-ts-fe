import { Button, Space } from 'antd';
import React from 'react';
import { OnSearchProps } from '../../types/table.type';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { handleReset, handleSearch } from './TableCustom';

type SearchButtonProps<T> = {
	dataIndex: keyof T;
	clearFilters: (() => void) | undefined;
	confirm: FilterDropdownProps['confirm'];
	selectedKeys: React.Key[];
	onSearch: (params: OnSearchProps) => void;
	onReset: (params: OnSearchProps) => void;
};

const SearchButton = <T,>({
	clearFilters,
	confirm,
	dataIndex,
	selectedKeys,
	onSearch,
	onReset,
}: SearchButtonProps<T>) => {
	return (
		<Space>
			<Button
				type="primary"
				onClick={() => {
					handleSearch({
						confirm,
						dataIndex: String(dataIndex),
						selectedKeys: selectedKeys as string[],
						action: onSearch,
					});
				}}
				size="small"
				style={{ width: 90 }}
			>
				Search
			</Button>
			<Button
				onClick={() => {
					clearFilters &&
						handleReset({
							confirm,
							action: onReset,
							dataIndex: String(dataIndex),
							selectedKeys: selectedKeys as string[],
						});
				}}
				size="small"
				style={{ width: 90 }}
			>
				Reset
			</Button>
		</Space>
	);
};

export default SearchButton;
