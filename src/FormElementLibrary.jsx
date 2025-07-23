import React from 'react';
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaList, FaImage, FaStar,
  FaQuoteRight, FaCheckCircle, FaSortNumericUp
} from 'react-icons/fa';
import { BsBarChartFill, BsFillPersonLinesFill } from 'react-icons/bs';
import { MdTextFields } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import { GoSmiley } from "react-icons/go";
import { LuGauge } from "react-icons/lu";


const formGroups = [
  {
    title: 'Contact info',
    items: [
      { label: 'Contact Info', type: 'contact', icon: <BsFillPersonLinesFill /> },
      { label: 'Email', type: 'email', icon: <FaEnvelope /> },
      { label: 'Phone Number', type: 'phone', icon: <FaPhone /> },
      { label: 'Address', type: 'address', icon: <FaMapMarkerAlt /> },
    ],
  },
  {
    title: 'Choice',
    items: [
      { label: 'Multiple Choice', type: 'multiple', icon: <FaList /> },
      { label: 'Dropdown', type: 'dropdown', icon: <FaSortNumericUp /> },
      { label: 'Yes/No', type: 'yesno', icon: <FaCheckCircle /> },
    ],
  },
  {
    title: 'Rating',
    items: [
      { label: 'Net Promoter Score', type: 'NPS', icon: <LuGauge />      },
      { label: 'Star Rating', type: 'Star Rating', icon: <FaStar /> },
      { label: 'Emoji Rating', type: 'Emoji Rating', icon: <GoSmiley />      },
      { label: 'Likert Scale', type: 'Likert Scale', icon: <GoSmiley />      },
      { label: 'Martix', type: 'Martix', icon: <GoSmiley />      },
    ],
  },
  {
    title: 'Text',
    items: [
      { label: 'Long Text', type: 'text', icon: <MdTextFields /> },
    ],
  },
];

const FormElementLibrary = ({ onSelect, onClose }) => {
  return (
    <div className="relative p-6 bg-white max-h-[80vh] overflow-hidden font-[Poppins] rounded-lg shadow-xl">

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <MdClose size={20} />
      </button>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {formGroups.map((group, idx) => (
          <div key={idx}>
            <h3 className="font-semibold mb-4 text-gray-800">{group.title}</h3>
            <div className="space-y-3">
              {group.items.map((item, i) => (
                <div
                  key={i}
                  onClick={() => onSelect(item.type)}
                  className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer"
                >
                  <span className="text-xl text-indigo-500">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormElementLibrary;
