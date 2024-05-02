import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';

const App: React.FC = () => {
	// moment.updateLocale('id', localization);
	// moment.locale('id');
	return (
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	);
};

export default App;
