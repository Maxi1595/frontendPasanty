import './App.css'
import Navbar from './components/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <>
     <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppRouter />    
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
