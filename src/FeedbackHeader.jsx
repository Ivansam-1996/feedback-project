import React from 'react';
import { FaHome, FaThList, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { HiOutlineMenu } from 'react-icons/hi';
import { RiMoonClearLine } from 'react-icons/ri';
import { AiOutlineBell } from 'react-icons/ai';
import { BsCart, BsFullscreen } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';


import { Avatar } from 'flowbite-react';
import { Outlet, Link } from 'react-router-dom';


const FeedbackHeader = () => {
  return (
    <div className="flex font-[Poppins] min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111C44] text-white flex flex-col py-6 px-4 shadow-lg">
        <h1 className="text-2xl font-bold mb-8 px-2">Feedback Module</h1>
        <nav className="flex flex-col space-y-6">
         
          <Link to="/" className="flex items-center gap-3 px-3 py-2 hover:bg-indigo-600 rounded">
  <FaHome /> Dashboards
</Link>
         
          <Link to="/get-started" className="flex items-center gap-3 px-3 py-2 hover:bg-indigo-600 rounded">
  <FaThList /> Get Started Page
</Link>
          
          <Link to="/form-builder" className="flex items-center gap-3 px-3 py-2 hover:bg-indigo-600 rounded">
  <FaUser /> Create Feedback
</Link>
<Link to="/view-feedback" className="flex items-center gap-3 px-3 py-2 hover:bg-indigo-600 rounded">
  <FaSignOutAlt /> View Feedback
</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow">
          <div className="flex items-center gap-4">
            <HiOutlineMenu className="text-2xl text-gray-600" />
          </div>

          <div className="flex items-center gap-4">
            <RiMoonClearLine className="text-xl text-gray-600" />
            <BsCart className="text-xl text-gray-600" />
            <AiOutlineBell className="text-xl text-gray-600" />
            <BsFullscreen className="text-xl text-gray-600" />
            <Avatar img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
            <FiSettings className="text-xl text-gray-600" />
          </div>
        </header>

        {/* Placeholder for Page Content */}
        <main className="p-6">
  <Outlet />
</main>
      </div>
    </div>
  );
};

export default FeedbackHeader;
