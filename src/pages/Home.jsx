import React, {useState} from 'react';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';

const Home = ({ sidebar }) => {

  const [category,setCategory] = useState(0);

  return (
    <div className='flex'>
      <Sidebar isSidebarOpen={sidebar} category= {category} setCategory={setCategory}/>
      <div
        className={`bg-[#f9f9f9] text-gray-900 dark:bg-zinc-900 dark:text-white pt-5 pb-5 pr-[2%] ${
          sidebar ? 'pl-[17%]' : 'pl-[7%]'
        } w-full transition-colors duration-300`} 
      >
        <Feed category={category} />
      </div>
    </div>
  );
};

export default Home;