import { ZodError, ZodString } from 'zod';

type ValidateProps = {
	value: any;
	schema: ZodString;
};

const validate = ({ schema, value }: ValidateProps) => {
	try {
		schema.parse(value);
		return Promise.resolve();
	} catch (e) {
		const error = e as ZodError;
		return Promise.reject(new Error(error.issues[0].message));
	}
};

export default validate;
