import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query' 
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' 
import { queryClient } from './lib/react-query' 

import './globals.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		{/*queryClient를 앱 전체에 주입*/}
		<QueryClientProvider client={queryClient}>
			<App />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</StrictMode>,
)
