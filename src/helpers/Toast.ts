import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const showAxiosResponseErrorToast = <T extends ErrorResponseType>({
	response,
}: AxiosError<T>) => {
	if (response?.data.errors) {
		toast.error(response?.data.errors);
	} else {
		toast.error('Internal Server Error');
	}
};
