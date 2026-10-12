import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AppProvider } from './store/appContext';
import { GlobalBackground } from './components/layout/GlobalBackground';

export function App() {
  return (
    <AppProvider>
      <GlobalBackground />
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
