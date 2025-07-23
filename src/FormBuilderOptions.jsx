import React, { useState } from 'react';
import { FaPlus, FaUpload } from 'react-icons/fa';
import FormElementLibrary from './FormElementLibrary';
import TypeformBuilder from './TypeformBuilder';
import ProgressSteps from './ProgressSteps';
import SurveyModal from './SurveyModal';
import { Outlet, Link, useNavigate} from 'react-router-dom';


const FormBuilderOptions = () => {
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const navigate = useNavigate(); // 👈 Add this

  const options = [
    {
      title: 'Start from scratch',
      description: 'Build from a list of ready-made form elements.',
      icon: <FaPlus className="text-2xl text-blue-600" />,
      onClick: () => setShowSurveyModal(true),
    },
    {
      title: 'Use Template',
      description: 'Click the existing template and customise it as you please',
      icon: <FaUpload className="text-2xl text-purple-500" />,
      onClick: () => alert('Template clicked'),
    },
    {
      title: 'Net Promoter Score',
      description: 'The gold standard for measuring customer loyalty and growth.',
      icon: <FaUpload className="text-2xl text-purple-500" />,
      onClick: () => alert('Template clicked'),
    },
    {
      title: 'Customer Effort Score',
      description: 'Make every customer interaction effortless and enjoyable',
      icon: <FaUpload className="text-2xl text-purple-500" />,
      onClick: () => alert('Template clicked'),
    },
    {
      title: 'Customer Satisfaction Score',
      description: 'Measure immediate satisfaction with key interactions.',
      icon: <FaUpload className="text-2xl text-purple-500" />,
      onClick: () => alert('Template clicked'),
    },
  ];

  return (
    <div className="flex flex-col items-center py-10 font-[Poppins] bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-10 text-gray-800">
        How do you want to build your form?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map((opt, i) => (
          <div
            key={i}
            onClick={opt.onClick}
            className="cursor-pointer bg-white border border-gray-200 hover:border-indigo-500 hover:shadow-lg rounded-lg p-6 text-center transition-all duration-200"
          >
            <div className="mb-4 flex justify-center">{opt.icon}</div>
            <h3 className="text-lg font-medium text-gray-900">{opt.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{opt.description}</p>
          </div>
        ))}
      </div>

      {showSurveyModal && (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[600px] max-w-full p-6 relative">
        <SurveyModal
          isOpen={showSurveyModal}
          onClose={() => setShowSurveyModal(false)}
          onAdd={() => {
            setShowSurveyModal(false);
            navigate('/builder'); // 👈 Navigate to builder
          }}
        />
      </div>
    </div>
  )}
    </div>
  );
};

export default FormBuilderOptions;
