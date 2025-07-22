import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import { Toaster } from "@/components/ui/sonner"


createRoot(document.getElementById('root')!).render(
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className='w-screen h-screen overflow-auto scrollbar-hide'>
      <App />
      </div>
      <Toaster />
    </ThemeProvider>
)