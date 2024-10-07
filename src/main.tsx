import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Buffer } from 'buffer'
import App from './App.tsx'
import './index.css'
import { RecoilRoot } from 'recoil';

globalThis.Buffer = Buffer;
const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "877288416977-epf9ruoeh62oe1no12mis32h1n089f87.apps.googleusercontent.com";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </GoogleOAuthProvider>
  </StrictMode>,
)
