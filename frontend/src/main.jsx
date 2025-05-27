import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import ContextProvider from './provider/ContextProvider.jsx'
import { PatientProvider } from './provider/PatientContext'
import AuthProvider from './provider/AuthProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <ContextProvider>
    <PatientProvider>
          <RouterProvider router={router} />
    </PatientProvider>
    </ContextProvider>
    </AuthProvider>
  </StrictMode>,
)
