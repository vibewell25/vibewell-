import React from 'react';
import '../styles/globals.css';

export const Preview = ({ children }) => (
  <div className="theme-light">
    <div className="p-4">
      {children}
    </div>
  </div>
);

export default Preview; 