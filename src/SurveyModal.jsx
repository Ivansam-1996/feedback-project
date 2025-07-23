import React from 'react';
import { Dropdown } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const SurveyModal = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Name your Feedback</h2>

        {/* Survey Name */}
        <div className="mb-4 relative">
          <label className="block font-semibold text-gray-800 mb-1 flex items-center gap-2">
            Feedback Name
            <div className="relative group cursor-pointer">
              <i className="bi bi-info-circle text-gray-500"></i>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-10 
                          w-64 rounded-lg bg-black text-white text-xs px-3 py-2 opacity-0 
                          group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                An ideal Feedback name would be sweet and catchy and must draw the interest of your target audience.
              </div>
            </div>
          </label>
          <input
            type="text"
            className="w-full border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded px-3 py-2"
          />
        </div>

        {/* Feedback Description */}
        <div className="mb-4 relative">
          <label className="block font-semibold text-gray-800 mb-1 flex items-center gap-2">
            Feedback Description
            <div className="relative group cursor-pointer">
              <i className="bi bi-info-circle text-gray-500"></i>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-10 
                          w-64 rounded-lg bg-black text-white text-xs px-3 py-2 opacity-0 
                          group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Feedback description is the best place to record the intent of the Feedback.
              </div>
            </div>
          </label>
          <textarea
            rows="3"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Dropdown Field */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-800 mb-1">What are you measuring?</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            defaultValue=""
          >
            <option value="" disabled>Select a type</option>
            <option value="experience">Satisfaction</option>
            <option value="loyalty">Ease of Use</option>
            <option value="survey">Loyalty</option>
            <option value="support">Others</option>
          </select>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-indigo-400 text-indigo-500 rounded hover:bg-indigo-50"
          >
            Cancel
          </button>
          <button
            onClick={onAdd}
            className="px-5 py-2 bg-indigo-400 hover:bg-indigo-500 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyModal;
