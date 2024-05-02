import { EditFilled, PlusCircleFilled } from '@ant-design/icons';
import { Button, Divider, Flex, theme, Typography } from 'antd';
import { ButtonProps } from 'antd/es/button';
import { ReactNode } from 'react';

type ActionButtonsProps = ButtonProps & {
	purpose: 'create' | 'update';
};

type ContainerProps = {
	children: ReactNode;
	title: string;
	actionButtons?: ActionButtonsProps[];
};

const Container = ({ children, title, actionButtons }: ContainerProps) => {
	const {
		token: { borderRadiusLG },
	} = theme.useToken();

	return (
		<div
			style={{
				padding: 24,
				background: 'white',
				borderRadius: borderRadiusLG,
				minHeight: '72vh',
			}}
		>
			<Flex justify="space-between" align="center">
				<Typography.Title level={3}>{title}</Typography.Title>
				{actionButtons?.length && (
					<div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
						{actionButtons.map((item, key) => {
							return <ActionButton key={key} {...item} />;
						})}
					</div>
				)}
			</Flex>
			<Divider />
			<div>{children}</div>
		</div>
	);
};

const ActionButton = (props: ActionButtonsProps) => {
	const icon = {
		create: <PlusCircleFilled />,
		update: <EditFilled />,
	};
	return <Button {...props} icon={icon[props.purpose]} />;
};

export default Container;
