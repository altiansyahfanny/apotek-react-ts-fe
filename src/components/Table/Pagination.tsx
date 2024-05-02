import { Pagination as PaginationAntd } from 'antd';
import { HandleChangePaginationProps, PaginationType } from '../../types/table.type';

type PaginationProps = {
	pagination: PaginationType;
	onPaginationChange: (props: HandleChangePaginationProps) => void;
	disabled?: boolean;
};

const Pagination = ({ onPaginationChange, pagination, disabled = false }: PaginationProps) => {
	const onChange: ((page: number, pageSize: number) => void) | undefined = (page, pageSize) => {
		onPaginationChange({ page, pageSize });
	};
	return (
		<div style={{ marginTop: 16, display: 'flex', justifyContent: 'end' }}>
			<PaginationAntd
				current={pagination.page}
				pageSize={pagination.pageSize}
				total={pagination.total}
				onChange={onChange}
				disabled={disabled}
			/>
		</div>
	);
};

export default Pagination;
