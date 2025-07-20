import React from 'react';
import Sidebar from '../components/Sidebar';

const Home = ({ sidebar }) => {
  return (
    <div className='flex'>
      {/* Pass the 'sidebar' prop from App.js as 'isSidebarOpen' to Sidebar */}
      <Sidebar isSidebarOpen={sidebar} />
    </div>
  );
};

export default Home;