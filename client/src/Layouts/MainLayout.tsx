import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Layout/Header'
import Footer from '../Components/Layout/Footer';

const MainLayout: React.FC = () => {
    return (
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  };
  
  export default MainLayout;
