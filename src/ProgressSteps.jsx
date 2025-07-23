import React from 'react';
import { FaWrench, FaCogs, FaComments } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const ProgressSteps = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    { label: 'Build', icon: <FaWrench className="mr-2" />, path: '/builder' },
    { label: 'Communication', icon: <FaComments className="mr-2" />, path: '/communication' },
  ];

  // Find current step index based on URL
  const currentIndex = steps.findIndex((step) => location.pathname.includes(step.path));
  const currentStep = currentIndex + 1;

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      navigate(steps[currentIndex + 1].path);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigate(steps[currentIndex - 1].path);
    }
  };

  return (
    <div className="flex justify-between items-center h-[100px] font-poppins border border-gray-200 bg-white shadow mb-10 px-6 rounded-lg">
      {/* Step indicators */}
      <ol className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-center text-gray-500 sm:text-base">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <li key={index} className={`flex items-center ${isCurrent ? 'text-indigo-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
              <span
                className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0
                  ${isCurrent ? 'border-indigo-600' : isCompleted ? 'border-green-600' : 'border-gray-400'}
                `}
              >
                {stepNum}
              </span>
              <span className="flex items-center">
                {step.icon}
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <svg
                  className="w-3 h-3 ms-2 sm:ms-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m7 9 4-4-4-4M1 9l4-4-4-4"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ol>

      {/* Navigation Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <button
  onClick={handleNext}
  className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
>
  {currentIndex === steps.length - 1 ? 'Publish' : 'Next'}
</button>
      </div>
    </div>
  );
};

export default ProgressSteps;
