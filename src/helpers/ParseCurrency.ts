// import writtenNumber from 'written-number';

export const formatNumber = (numbers: number) => {
	const options = {
		style: 'decimal',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	};
	return new Intl.NumberFormat('id-ID', options).format(numbers);
};

// export const formatCurrency = (currency) => {
//   const options = {
//     style: 'currency',
//     currency: 'IDR',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   };
//   return new Intl.NumberFormat('id-ID', options).format(currency);
// };

// export default function parseCurrency(currency) {
//   if (currency) {
//     const formatted = formatCurrency(currency);
//     const written = writtenNumber(currency, { lang: 'id' });
//     return { formatted, written };
//   }
//   return { formatted: '', written: '' };
// }
