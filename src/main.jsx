import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router";
import { router } from './Routes/Routes';
import AuthProvider from './Provider/AuthProvider';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <>
        <RouterProvider router={router} />
        <Toaster position="bottom-center" reverseOrder={false} />
      </>
    </AuthProvider>
  </StrictMode>
);
