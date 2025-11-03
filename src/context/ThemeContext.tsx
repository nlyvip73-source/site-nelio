import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    if (savedTheme) {
      setMode(savedTheme);
    } else {
      // Set light theme as default
      localStorage.setItem('theme', 'light');
    }
  }, []);

  useEffect(() => {
    // Save theme preference
    localStorage.setItem('theme', mode);
    
    // Apply theme class to body
    document.body.className = mode === 'dark' ? 'dark-theme' : 'light-theme';
  }, [mode]);

  const toggleTheme = () => {
    setMode(prevMode => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  // Create MUI theme based on mode
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#0D47A1',
      },
      secondary: {
        main: '#1565C0',
      },
      background: {
        default: mode === 'dark' ? '#000000' : '#ffffff',
        paper: mode === 'dark' ? '#1a1a1a' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#FFFFFF' : '#111111',
        secondary: mode === 'dark' ? '#d32f2f' : '#555555',
      },
      error: {
        main: '#FF0000', // Pure red for errors
      },
    },
    typography: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
        letterSpacing: '0.5px',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '0.3px',
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            padding: '8px 20px',
            transition: 'all 0.3s ease',
          },
          containedPrimary: {
            backgroundColor: '#d32f2f',
            '&:hover': {
              backgroundColor: '#b71c1c',
              transform: 'scale(1.03)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.03)',
              zIndex: 1,
              boxShadow: mode === 'dark' ? '0 10px 20px rgba(0,0,0,0.5)' : '0 8px 16px rgba(0,0,0,0.12)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
            color: mode === 'dark' ? '#ffffff' : '#111111',
            boxShadow: mode === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: 'rgba(211, 47, 47, 0.1)',
            }
          }
        }
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 