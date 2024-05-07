import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Router />
			<Toaster
				toastOptions={{
					style: {
						fontFamily: 'sans-serif',
					},
				}}
			/>
		</BrowserRouter>
	);
};

export default App;
