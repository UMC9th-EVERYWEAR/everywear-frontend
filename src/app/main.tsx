import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '@/src/shared/styles/globals.css'
import '@/src/shared/styles/index.css'


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
