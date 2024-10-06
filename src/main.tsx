import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Buffer } from 'buffer'
import App from './App.tsx'
import './index.css'
import { RecoilRoot } from 'recoil';

globalThis.Buffer = Buffer;
const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </GoogleOAuthProvider>
  </StrictMode>,
)
