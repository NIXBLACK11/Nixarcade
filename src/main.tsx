import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Buffer } from 'buffer'
import App from './App.tsx'
import './index.css'
import './fonts.css'
import { RecoilRoot } from 'recoil';
import ErrorToast from './components/ErrorToast.tsx';

globalThis.Buffer = Buffer;
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <RecoilRoot>
        <App />
        <ErrorToast />
      </RecoilRoot>
    </GoogleOAuthProvider>
  </StrictMode>,
)
