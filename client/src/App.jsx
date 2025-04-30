import React from 'react';
import { CssBaseline } from '@mui/material';
import Dashboard from './pages/Dashboard';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';

function App() {
  return (
    <>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'pt-br'}>
        <Dashboard />
      </LocalizationProvider>
    </>
  );
}

export default App;
