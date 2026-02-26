import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MobileView } from './views/MobileView';
import { DesktopView } from './views/DesktopView';
import { LandingView } from './views/LandingView';

const App = () => {
  return (
    <BrowserRouter basename="/offgridpro">
      <Routes>
        <Route path="/" element={<LandingView />} />
        <Route path="/app" element={<MobileView />} />
        <Route path="/web" element={<DesktopView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
