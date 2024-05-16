import React from 'react';

type ComponentSearchOwnProps<T extends React.ElementType> = {
	as?: T;
};

type ComponentSearchProps<T extends React.ElementType> = ComponentSearchOwnProps<T> &
	Omit<React.ComponentProps<T>, keyof ComponentSearchOwnProps<T>>;

const ComponentSearch = <T extends React.ElementType>({
	children,
	color,
	size,
	as,
}: ComponentSearchProps<T>) => {
	const Component = as || 'input';
	return <Component>{children}</Component>;
};

export default ComponentSearch;
