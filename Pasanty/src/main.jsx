import ReactDOM from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles'
import GlobalStyles from '@mui/material/GlobalStyles';
import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <StyledEngineProvider enableCssLayer>
  <StrictMode>
    <GlobalStyles styles="@layer theme, base, mui, components, utilities;"/>
    <App />
  </StrictMode>,
  </StyledEngineProvider>
);
