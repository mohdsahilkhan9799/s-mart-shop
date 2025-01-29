import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100"> 
      <Navigation />
      <main className="flex-fill"> 
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
