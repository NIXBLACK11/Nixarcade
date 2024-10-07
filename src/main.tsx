import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Buffer } from 'buffer'
import App from './App.tsx'
import './index.css'
import { RecoilRoot } from 'recoil';

globalThis.Buffer = Buffer;
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log(import.meta.env);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </GoogleOAuthProvider>
  </StrictMode>,
)
