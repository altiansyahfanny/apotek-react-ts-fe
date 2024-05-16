import { DatePicker, DatePickerProps, Input, InputNumber, Select, SelectProps } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { formatNumber } from '../../helpers/ParseCurrency';
import { handleSearch } from './TableCustom';
import { ColumnSearchProps } from '../../types/table.type';
import dayjs from 'dayjs';

type SearchInputProps<T> = Omit<ColumnSearchProps<T>, 'onReset'> & {
	confirm: FilterDropdownProps['confirm'];
	selectedKeys: string[];
};

const SearchInput = <T extends {}>({
	dataIndex,
	filter,
	searchInput,
	handleChangeInputSearch,
	onSearch,
	confirm,
	selectedKeys,
	componentInputSearch = 'input',
	options,
}: SearchInputProps<T>) => {
	console.log('filter : ', filter);
	const componentProps = {
		ref: searchInput,
		placeholder: `${componentInputSearch === 'option' ? 'Choose' : 'Search'} ${String(dataIndex)}`,
		onPressEnter: () => {
			handleSearch({
				confirm,
				dataIndex: String(dataIndex),
				selectedKeys: selectedKeys as string[],
				action: onSearch,
			});
		},
	};

	let content = (
		<Input
			style={{ display: 'block' }}
			onChange={(e) => {
				handleChangeInputSearch({ dataIndex: String(dataIndex), value: e.target.value });
			}}
			value={String(filter[dataIndex])}
			{...componentProps}
		/>
	);

	if (componentInputSearch === 'number') {
		content = (
			<InputNumber
				value={String(filter[dataIndex])}
				formatter={(value: string | undefined) =>
					value?.length === 0 || isNaN(Number(value)) ? '' : formatNumber(Number(value))
				}
				parser={(value) => value!.replace(/\./g, '')}
				onChange={(value) => {
					handleChangeInputSearch({ dataIndex: String(dataIndex), value: value ?? '' });
				}}
				style={{ display: 'block', width: '100%' }}
				{...componentProps}
			/>
		);
	}

	if (componentInputSearch === 'date') {
		const onChange: DatePickerProps['onChange'] = (_, dateString) => {
			handleChangeInputSearch({
				dataIndex: String(dataIndex),
				value: dateString as string,
			});
		};
		content = (
			<DatePicker
				value={String(filter[dataIndex]) ? dayjs(String(filter[dataIndex]), 'DD-MM-YYYY') : null}
				onChange={onChange}
				format={'DD-MM-YYYY'}
				style={{ display: 'block', width: '100%' }}
				{...componentProps}
			/>
		);
	}

	if (componentInputSearch === 'option') {
		const onChange: SelectProps['onChange'] = (value) => {
			handleChangeInputSearch({
				dataIndex: String(dataIndex),
				value,
			});
		};
		content = (
			<Select
				style={{ display: 'block', width: '100%' }}
				ref={searchInput}
				placeholder={`Choose ${String(dataIndex)}`}
				onChange={onChange}
				value={String(filter[dataIndex]) ? String(filter[dataIndex]) : null}
			>
				{options?.map((ops, key) => (
					<Select.Option key={key} value={ops.value}>
						{ops.label}
					</Select.Option>
				))}
			</Select>
		);
	}

	return content;
};

export default SearchInput;
