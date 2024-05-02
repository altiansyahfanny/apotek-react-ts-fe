import React from 'react';
import { formatNumber } from '../helpers/ParseCurrency';
import { InputNumber as InputNumberAntd, InputNumberProps as InputNumberPropsAntd } from 'antd';

type InputNumberProps = Omit<InputNumberPropsAntd, 'formatter | parser'>;

const formatter = (value: string | undefined) => {
	if (value?.length === 0 || isNaN(Number(value))) {
		return '';
	}

	return formatNumber(Number(value));
};

const parser = (value: string | undefined) => value!.replace(/\./g, '');

const InputNumber: React.FC<InputNumberProps> = ({}) => {
	return (
		<InputNumberAntd
			formatter={formatter}
			parser={parser}
			// onChange={onChange}
			// {...props}
			style={{ display: 'block', width: '100%' }}
		/>
	);
};

export default InputNumber;
