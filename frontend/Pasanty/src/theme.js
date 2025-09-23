import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Aquí no sobreescribimos completamente los estilos de MUI, solo los mejoramos para que permitan el uso de Tailwind
          borderRadius: '8px', // Ejemplo de personalización
          boxShadow: 'none', // Eliminamos sombra para evitar conflictos con Tailwind
        },
      },
    },
    // Puedes agregar otros componentes de MUI aquí (por ejemplo, MuiTypography, MuiCard, etc)
  },
});

export default theme;