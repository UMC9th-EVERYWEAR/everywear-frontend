import { ErrorBoundary } from 'react-error-boundary';
import React from 'react';
import ErrorPage from '@/src/pages/error/error-page';

const AppErrorBoundary = ({ children }: { children: React.ReactNode }) => {
	return (
		<ErrorBoundary
			FallbackComponent={ErrorPage}
			onError={(error, info) => {
				console.error('Unhandled error:', error, info);
				// sentry.captureException(error);
			}}
		>
			{children}
		</ErrorBoundary>
	);
};

export default AppErrorBoundary;
