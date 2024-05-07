import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';

import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Router />
			<Toaster />
		</BrowserRouter>
	);
};

export default App;
