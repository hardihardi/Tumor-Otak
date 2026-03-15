import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import MRIAnalysis from './pages/MRIAnalysis';
import Patients from './pages/Patients';
import ActivityLogs from './pages/ActivityLogs';
import Roles from './pages/Roles';
import Permissions from './pages/Permissions';
import Settings from './pages/Settings';

const theme = createTheme({
  palette: {
    primary: {
      main: '#135bec',
    },
    secondary: {
      main: '#ff4d4f',
    },
    background: {
      default: '#f4f7fe',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analyze" element={<MRIAnalysis />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/logs" element={<ActivityLogs />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/permissions" element={<Permissions />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
