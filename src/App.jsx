import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MobileView } from './views/MobileView';
import { DesktopView } from './views/DesktopView';

const App = () => {
  return (
    <BrowserRouter basename="/offgridpro">
      <Routes>
        <Route path="/" element={<MobileView />} />
        <Route path="/web" element={<DesktopView />} />
        <Route path="*" element={<MobileView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
