import { SorterType } from '../types/table.type';

export const transformSorter = <T>(
	field: keyof T,
	order: string | undefined | null
): SorterType<T> => {
	if (order) {
		if (order === 'descend') {
			return {
				sortColumn: field,
				sortDirection: 'desc',
			};
		} else {
			return {
				sortColumn: field,
				sortDirection: 'asc',
			};
		}
	}

	return {
		sortColumn: 'id',
		sortDirection: 'desc',
	};
};
