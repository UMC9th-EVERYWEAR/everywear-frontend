import { RouterProvider } from 'react-router';
import { router } from './router/router';
import AppErrorBoundary from './providers/ErrorBoundary';

function App() {

	return (
		<AppErrorBoundary>
			<RouterProvider router={router} />
		</AppErrorBoundary>
	);
}

export default App;
