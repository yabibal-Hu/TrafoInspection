import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { UserProvider } from './contexts/UserContext.tsx'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n.ts'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <I18nextProvider i18n={i18n}>
    <UserProvider>
      <App />
    </UserProvider>
    </I18nextProvider>
    </BrowserRouter>
  </StrictMode>
);
