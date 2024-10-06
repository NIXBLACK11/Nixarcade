import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Buffer } from 'buffer'

import App from './App.tsx'
import './index.css'

globalThis.Buffer = Buffer;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="*******************************">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
