import { Button, Form, FormInstance, Input, Space } from 'antd';
import { UserType } from '../../../types/user.type';

interface FormUserProps {
	form: FormInstance<any>;
	user?: UserType;
	onFinish: (value: UserType) => void;
}

const FormUser: React.FC<FormUserProps> = ({ form, onFinish }) => {
	return (
		<Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}>
			<Form.Item name="name" label="Name" rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
				<Input />
			</Form.Item>
			<Form.Item>
				<Space>
					<Button htmlType="submit" type="primary">
						Submit
					</Button>
					<Button htmlType="reset">Reset</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

export default FormUser;
