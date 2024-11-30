import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import ContextProvider from './provider/ContextProvider.jsx'
import { PatientProvider } from './provider/PatientContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
    <PatientProvider>
          <RouterProvider router={router} />
    </PatientProvider>
    </ContextProvider>
  </StrictMode>,
)
