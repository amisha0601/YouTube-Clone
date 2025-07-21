import React from 'react';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';

const Home = ({ sidebar }) => {
  return (
    <div className='flex'>
      <Sidebar isSidebarOpen={sidebar} />
      <div
        className={`bg-[#f9f9f9] pt-5 pb-5 pr-[2%] ${
          sidebar ? 'pl-[17%]' : 'pl-[7%]'
        } w-full`}
      >
        <Feed />
      </div>
    </div>
  );
};

export default Home;