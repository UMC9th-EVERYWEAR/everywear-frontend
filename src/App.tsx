import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './router/router';
import AppErrorBoundary from './providers/ErrorBoundary';
import { useThemeStore } from '@/src/store/use-theme-store';

function App() {
	const theme = useThemeStore((state) => state.theme);

	useEffect(() => {
		const root = window.document.documentElement;
		if (theme === 'dark') {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
	}, [theme]);

	return (
		<AppErrorBoundary>
			<div className="min-h-screen w-full bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
				<RouterProvider router={router} />
			</div>
		</AppErrorBoundary>
	);
}

export default App;
