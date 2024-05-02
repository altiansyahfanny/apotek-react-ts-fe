import React from 'react';

type TextOwnProps<T extends React.ElementType> = {
	size?: 'sm' | 'md' | 'lg';
	color?: 'primary' | 'secondary';
	children: React.ReactNode;
	as?: T;
};

type TextProps<T extends React.ElementType> = TextOwnProps<T> &
	Omit<React.ComponentProps<T>, keyof TextOwnProps<T>>;

const Text = <T extends React.ElementType>({ children, color, size, as }: TextProps<T>) => {
	const Component = as || 'div';
	return <Component className={`class-with-${size}-${color}`}>{children}</Component>;
};

export default Text;
