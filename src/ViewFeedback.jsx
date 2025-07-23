import React, { useState, useEffect, useRef } from 'react';
import {useNavigate } from 'react-router-dom';
import { HiDotsVertical } from 'react-icons/hi';
import { FaRegFileAlt,FaPause, FaPlay, FaCheck } from 'react-icons/fa';
import { FiEye, FiEdit2, FiCopy, FiEyeOff } from 'react-icons/fi';
import { HiOutlineSearch, HiChevronDown } from 'react-icons/hi';
import FeedbackDetail from './FeedbackDetail'; 


const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'Completed':
      return 'bg-gray-100 text-gray-800';
    case 'Draft':
      return 'bg-yellow-100 text-yellow-800';
    case 'Paused':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const initialSurveys = [
  {
    title: "Loyalty Program Satisfaction - NPS",
    modified: "21h ago",
    createdDate: '21-05-2025',
    status:'Active',
    responses: "100",
  },
  {
    title: "Return Process Feedback - CES",
    modified: "2d ago",
    createdDate: '21-03-2025',
    status:'Completed',
    responses: "230",
  },
  {
    title: "Post-Purchase Experience Survey - CSAT",
    modified: "2d ago",
    createdDate: '12-04-2025',
    status:'Paused',
    responses: "430",
  },
  {
    title: "Customer Satisfaction Survey",
    modified: "3d ago",
    createdDate: '11-01-2024',
    status:'Draft',    
    responses: "90",
  }
];

const SurveyList = () => {
  const navigate = useNavigate();
const handleView = (survey) => {
  navigate(`/feedback`);
};

  const [surveys, setSurveys] = useState(initialSurveys);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [openDropdownTitle, setOpenDropdownTitle] = useState(null);
  const dropdownRefs = useRef({});
  const toggleDropdown = (title) => {
    setOpenDropdownTitle((prev) => (prev === title ? null : title));
  };
  const handleSort = (key) => {
    const sorted = [...surveys].sort((a, b) => {
      if (typeof a[key] === 'number') return b[key] - a[key];
      return (b[key] || '').toString().localeCompare((a[key] || '').toString());
    });
    setSurveys(sorted);
    setSortKey(key);
  };

  const filteredSurveys = surveys.filter(survey =>
    survey.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50 px-8 xl:px-10 py-6 font-[Poppins]">
      {/* Page Heading */}
      <h1 className="text-3xl xl:text-2xl font-bold text-indigo-700 mb-2">
        Feedback List ({filteredSurveys.length})
      </h1>
      <span className="mb-4">
      Manage and monitor your customer feedback surveys
      </span>

      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 mt-4 gap-4">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search Feedback..."
            className=" pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <HiOutlineSearch className="absolute top-2.5 left-3 text-gray-400 text-lg" />
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700">
        <label htmlFor="sortBy" className="text-sm font-medium text-gray-700">Action</label>
        <select
          id="sortBy"
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="responses">Pause</option>
          <option value="createdDate">Complete</option>
          <option value="responses">Resume</option>

        </select>
        <label htmlFor="sortBy" className="text-sm font-medium text-gray-700">Sort by:</label>
  <select
    id="sortBy"
    onChange={(e) => handleSort(e.target.value)}
    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="responses">Responses</option>
    <option value="createdDate">Created Date</option>
  </select>
        </div>
      </div>

      {/* Table Header */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 text-xs font-semibold text-gray-500 bg-gray-100 px-6 py-3">
          
          <div className="col-span-4">Feedback Name </div>
          <div className="col-span-6 grid grid-cols-3 text-center">
          <div>Responses</div>
            <div>Created Date</div>
            <div>Status</div>            

          </div>
          <div className="col-span-2 flex justify-end pr-2">Actions</div>
        </div>

        {/* Survey List */}
        <div className="divide-y divide-gray-100">
          {filteredSurveys.map((survey, index) => (
            <div key={index} className="grid grid-cols-12 items-center px-6 py-4 hover:bg-gray-50 relative">
             <div className="col-span-4 flex items-center gap-4">
    <div>
      <div className="text-sm font-medium text-gray-800">{survey.title}</div>
      <div className="text-xs text-gray-500">Last Modified: {survey.modified}</div>
    </div>
  </div>

  <div className="col-span-6 grid grid-cols-3 text-center text-sm text-gray-700">
    <div className="font-semibold">{survey.responses}</div>
    <div>{survey.createdDate}</div>
    <div>
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(survey.status)}`}>
        {survey.status}
      </span>
    </div>
  </div>
  <div className="col-span-2 flex justify-end pr-2 relative">
    <button
      onClick={() => toggleDropdown(survey.title)}
      className="text-gray-400 hover:text-gray-600 focus:outline-none"
    >
      <HiDotsVertical size={18} />
    </button>

    {openDropdownTitle === survey.title && (
      <div className="absolute top-8 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow w-44">
        <ul className="py-2 text-sm text-gray-700">
          <li>
          <button onClick={handleView} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
  <FiEye /> View
</button>
          </li>
          <li>
            <button onClick={() => handleEdit(survey)} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
              <FiEdit2 /> Edit
            </button>
          </li>
          <li>
            <button onClick={() => handleClone(survey)} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
              <FiCopy /> Clone
            </button>
          </li>
          <li>
            <button onClick={() => handlePreview(survey)} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
              <FiEyeOff /> Preview
            </button>
          </li>
          <li>
            <button onClick={() => handleToggleStatus(survey)} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
              {survey.status === 'Active' ? (
                <>
                  <FaPause /> Pause
                </>
              ) : (
                <>
                  <FaPlay /> Resume
                </>
              )}
            </button>
          </li>
          <li>
            <button onClick={() => handleComplete(survey)} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
              <FaCheck /> Complete
            </button>
          </li>
        </ul>
      </div>
    )}
  </div>

            </div>
          ))}
        </div>
      </div>
      

      <div className="flex justify-end mt-6">
  <nav aria-label="Page navigation">
    <ul className="inline-flex -space-x-px text-sm">
      <li>
        <a
          href="#"
          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
        >
          Previous
        </a>
      </li>
      <li>
        <a
          href="#"
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        >
          1
        </a>
      </li>
      <li>
        <a
          href="#"
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        >
          2
        </a>
      </li>
      <li>
        <a
          href="#"
          aria-current="page"
          className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
        >
          3
        </a>
      </li>
      <li>
        <a
          href="#"
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        >
          4
        </a>
      </li>
      <li>
        <a
          href="#"
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
        >
          Next
        </a>
      </li>
    </ul>
  </nav>
</div>


    </div>
  );
};

export default SurveyList;
