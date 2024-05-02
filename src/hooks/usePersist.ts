import { useState, useEffect } from 'react';

const usePersist = () => {
	const persistString = localStorage.getItem('persist');
	const persistStorage = persistString ? JSON.parse(persistString) : null;
	const [persist, setPersist] = useState(persistStorage || false);

	useEffect(() => {
		localStorage.setItem('persist', JSON.stringify(persist));
	}, [persist]);

	return [persist, setPersist];
};
export default usePersist;
