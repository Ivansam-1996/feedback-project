import React, { useState, useRef } from 'react';
import { Plus, Trash2, X, MoreVertical, Star, ThumbsUp, ThumbsDown, Smile, Meh, Frown, CheckCircle } from 'lucide-react'; // Added CheckCircle
import { FaThumbsUp } from "react-icons/fa";


// Helper function for dynamic variable replacement (now fixed placeholder)
const replaceDynamicVariable = (text) => {
  const safeText = String(text || ''); // Ensure it's a string, default to empty
  const placeholder = `{{Dynamic Variable}}`;
  // Using split and join for replacement to avoid RegExp issues
  return safeText.split(placeholder).join(`[Dynamic Variable]`);
};

function getContrastTextColor(hex) {
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#') || hex.length !== 7) {
    return '#FFFFFF'; // Default to white text
  }
  // const r = parseInt(hex.substring(1, 3), 16);
  // const g = parseInt(hex.substring(3, 5), 16);
  // const b = parseInt(hex.substring(5, 7), 16);

  // const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  // return brightness > 140 ? '#000000' : '#FFFFFF';
  return hex;
}


const MobilePreviewContainer = ({ uploadedBannerImageUrl, questions, currentPreviewPage, resetPreview, children }) => {
  return (
    <div className="relative w-[375px] h-[700px] bg-black rounded-[40px] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden">
      <div className="w-full h-full bg-gradient-to-b from-[#2a2d35] to-[#1a1d24] rounded-[30px] relative overflow-hidden flex flex-col">

        {/* Top Half - Banner Image Area */}
        <div className="relative h-[200px]  bg-gradient-to-br from-[#f5f5f5] via-[#e0e0e0] to-[#3a4047] overflow-hidden">
          {uploadedBannerImageUrl ? (
            <img
            src={uploadedBannerImageUrl}
            alt="Uploaded Banner"
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
              No Banner Image
            </div>
          )}

          {/* Progress Dots */}
          <div className="absolute top-5 left-5 flex gap-2 z-20">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-1 rounded bg-white/30 transition-all duration-300 ${
                  index <= currentPreviewPage ? 'bg-white' : ''
                }`}
              />
            ))}
          </div>

          {/* Reset Button (acts like close) */}
          <button
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/20 text-white text-lg z-20 hover:bg-white/30 transition"
            onClick={resetPreview}
          >
            ×
          </button>
        </div>

        {/* Bottom Half - Main Content (rendered from parent) */}
        <div className="flex-1 p-6 flex flex-col justify-between text-white overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
// FormElementLibrary component remains the same
const FormElementLibrary = ({ onSelect, onClose }) => {
  const formElements = [
    { type: 'text', name: 'Short Text' },
    { type: 'long_text', name: 'Long Text' },
    { type: 'multiple', name: 'Multiple Choice' },
    { type: 'dropdown', name: 'Dropdown' },
    { type: 'yes_no', name: 'Yes/No' },
    { type: 'rating', name: 'Net Promoter Score (NPS)' },
    { type: 'star_rating', name: 'Star Rating' },
    { type: 'emoji_rating', name: 'Emoji Rating' },
    { type: 'likert_scale', name: 'Likert Scale' },
    { type: 'contact_info', name: 'Contact Info' },
    { type: 'email', name: 'Email' },
    { type: 'phone_number', name: 'Phone Number' },
    { type: 'address', name: 'Address' },
    { type: 'matrix', name: 'Matrix' },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition"
        aria-label="Close library"
      >
        <X size={20} />
      </button>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Add Question Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formElements.map((element) => (
          <button
            key={element.type}
            onClick={() => onSelect(element.type)}
            className="flex items-center justify-center p-4 border border-indigo-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="font-medium text-lg">{element.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};


// Main TypeformBuilder component
const TypeformBuilder = () => {
  // State for managing global sur
  // vey styles
  const [isPreviewSubmitted, setIsPreviewSubmitted] = useState(false);
  const goToPreviousPreviewQuestion = () => {
    if (currentPreviewPage > 0) {
      setCurrentPreviewPage((prev) => prev - 1);
    }
  };
  
  const [surveyStyles, setSurveyStyles] = useState({
    bannerImage: '',
    feedbackTitle: 'Your Feedback Form',
    feedbackDescription: 'Please share your thoughts with us.',
    themeColor: '#4F46E5', // Default Indigo 600
    thankYouMessage: 'Thank you for your feedback!',
  });

  // State for managing questions in the form
  const [questions, setQuestions] = useState([]);
  // State to track the currently active question for editing
  const [activeQuestionId, setActiveQuestionId] = useState(null);
  // State to control the visibility of the form element library
  const [showLibrary, setShowLibrary] = useState(false);
  // State to manage the dropdown menu for question options (duplicate, etc.)
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  // State to manage the view (content/logic) for each question
  const [questionViews, setQuestionViews] = useState({});
  // State to store follow-up rules for each question
  const [followUpRules, setFollowUpRules] = useState({});
  // State to store responses in the preview mode
  const [previewResponses, setPreviewResponses] = useState({});
  // State for controlling preview mode (mobile/web)
  const [previewMode, setPreviewMode] = useState('mobile');
  // New state for preview navigation: index of the current primary question displayed in preview
  const [currentPreviewPage, setCurrentPreviewPage] = useState(0);
  // State to manage the uploaded banner image URL
  const [uploadedBannerImageUrl, setUploadedBannerImageUrl] = useState('');
  // State to track if the survey is completed in preview
  const [surveyCompleted, setSurveyCompleted] = useState(false);


  // Ref to store input elements for dynamic variable insertion
  const questionLabelRefs = useRef({});

  /**
   * Handles banner image upload.
   * @param {object} e - The event object from the file input.
   */
  const handleBannerImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedBannerImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedBannerImageUrl('');
    }
  };

  /**
   * Adds a new question to the form.
   * @param {string} type - The type of question (e.g., 'rating', 'text', 'multiple').
   */
  const handleAddQuestion = (type) => {
    let newQuestion = {
      id: Date.now(), // Unique ID for the question
      type,
      label: `New ${type.replace('_', ' ')} question`,
      description: '',
      required: false,
      buttonText: 'Next', // Default button text
    };

    // Initialize type-specific properties
    switch (type) {
      case 'multiple':
      case 'dropdown':
        newQuestion.options = ['Option 1'];
        break;
      case 'yes_no':
        newQuestion.yesNoOptions = [{ text: 'Yes', type: 'text' }, { text: 'No', type: 'text' }];
        newQuestion.displayAsThumbs = false;
        break;
      case 'rating': // NPS
        newQuestion.scale = 10;
        newQuestion.lowScoreLabel = 'Not likely at all';
        newQuestion.highScoreLabel = 'Extremely likely';
        break;
      case 'star_rating':
      case 'emoji_rating':
      case 'likert_scale':
        newQuestion.scale = 5; // Default to 5 scale
        newQuestion.lowScoreLabel = 'Low';
        newQuestion.highScoreLabel = 'High';
        break;
      case 'matrix':
        newQuestion.rows = ['Row 1', 'Row 2'];
        newQuestion.columns = ['Column 1', 'Column 2'];
        newQuestion.matrixType = 'multiple'; // Default to multiple choice within matrix
        newQuestion.matrixOptions = ['Option A', 'Option B']; // Options for matrix cells
        break;
      case 'contact_info':
        newQuestion.label = 'Contact Information';
        newQuestion.fields = {
          email: true,
          phoneNumber: true,
          address: true,
        };
        break;
      default:
        break;
    }

    setQuestions((prev) => [...prev, newQuestion]);
    setActiveQuestionId(newQuestion.id); // Set the new question as active
    setShowLibrary(false); // Close the library after adding
    // When a new question is added, reset preview to show the first question
    setCurrentPreviewPage(0);
    setPreviewResponses({});
    setSurveyCompleted(false); // Reset survey completion status
  };

  /**
   * Handles changes to a question's properties (label, description, required, options).
   * @param {number} id - The ID of the question to update.
   * @param {string} field - The field to update (e.g., 'label', 'description').
   * @param {*} value - The new value for the field.
   */
  const handleChange = (id, field, value) => {
    setQuestions((qs) =>
      qs.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  /**
   * Handles changes to nested properties within a question (e.g., yesNoOptions text).
   * @param {number} id - The ID of the question to update.
   * @param {string} field - The top-level field (e.g., 'yesNoOptions').
   * @param {number} index - The index within the array/object.
   * @param {string} subField - The nested field (e.g., 'text').
   * @param {*} value - The new value.
   */
  const handleNestedChange = (id, field, index, subField, value) => {
    setQuestions((qs) =>
      qs.map((q) => {
        if (q.id === id) {
          const updatedField = [...q[field]];
          updatedField[index] = { ...updatedField[index], [subField]: value };
          return { ...q, [field]: updatedField };
        }
        return q;
      })
    );
  };

  /**
   * Handles changes for contact info sub-fields.
   */
  const handleContactInfoFieldChange = (id, fieldName, value) => {
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === id
          ? { ...q, fields: { ...q.fields, [fieldName]: value } }
          : q
      )
    );
  };

  /**
   * Duplicates an existing question.
   * @param {object} question - The question object to duplicate.
   */
  const handleDuplicate = (question) => {
    const duplicated = { ...question, id: Date.now() }; // Create a new ID for the duplicated question
    setQuestions((qs) => {
      const idx = qs.findIndex((q) => q.id === question.id);
      const updated = [...qs];
      updated.splice(idx + 1, 0, duplicated); // Insert the duplicated question after the original
      return updated;
    });
    setDropdownOpenId(null); // Close the dropdown after duplication
  };

  /**
   * Toggles the view (content or logic) for a specific question.
   * @param {number} id - The ID of the question.
   * @param {string} view - The view to set ('content' or 'logic').
   */
  const handleToggleView = (id, view) => {
    setQuestionViews((prev) => ({ ...prev, [id]: view }));
  };

  /**
   * Adds a new follow-up rule for a given question.
   * @param {number} questionId - The ID of the parent question.
   */
  const addFollowUpRule = (questionId) => {
    const newRule = {
      id: Date.now(),
      triggerValues: [], // Values that trigger this rule
      type: 'single', // 'single' or 'double' follow-up questions
      question1: { type: 'text', text: '', options: [] },
      question2: { type: 'text', text: '', options: [] }
    };

    setFollowUpRules(prev => ({
      ...prev,
      [questionId]: [...(prev[questionId] || []), newRule] // Add new rule to the array for the questionId
    }));
  };

  /**
   * Updates a specific field of a follow-up rule.
   * @param {number} questionId - The ID of the parent question.
   * @param {number} ruleId - The ID of the rule to update.
   * @param {string} field - The field to update within the rule.
   * @param {*} value - The new value for the field.
   */
  const updateFollowUpRule = (questionId, ruleId, field, value) => {
    setFollowUpRules(prev => ({
      ...prev,
      [questionId]: prev[questionId].map(rule =>
        rule.id === ruleId ? { ...rule, [field]: value } : rule
      )
    }));
  };

  /**
   * Updates a specific field of a follow-up question within a rule.
   * @param {number} questionId - The ID of the parent question.
   * @param {number} ruleId - The ID of the rule containing the follow-up question.
   * @param {number} questionNum - The number of the follow-up question (1 or 2).
   * @param {string} field - The field to update within the follow-up question.
   * @param {*} value - The new value.
   */
  const updateFollowUpQuestion = (questionId, ruleId, questionNum, field, value) => {
    setFollowUpRules(prev => ({
      ...prev,
      [questionId]: prev[questionId].map(rule =>
        rule.id === ruleId ? {
          ...rule,
          [`question${questionNum}`]: { ...rule[`question${questionNum}`], [field]: value }
        } : rule
      )
    }));
  };

  /**
   * Deletes a follow-up rule for a given question.
   * @param {number} questionId - The ID of the parent question.
   * @param {number} ruleId - The ID of the rule to delete.
   */
  const deleteFollowUpRule = (questionId, ruleId) => {
    setFollowUpRules(prev => ({
      ...prev,
      [questionId]: prev[questionId].filter(rule => rule.id !== ruleId)
    }));
  };

  /**
   * Gets the possible options for a given question type (used for trigger values in logic).
   * @param {object} question - The question object.
   * @returns {Array<string>} An array of possible options.
   */
  const getQuestionOptions = (question) => {
    switch (question.type) {
      case 'rating': // NPS
        return Array.from({ length: question.scale }, (_, i) => (i + 1).toString());
      case 'star_rating':
      case 'emoji_rating':
      case 'likert_scale':
        return Array.from({ length: question.scale }, (_, i) => (i + 1).toString());
      case 'multiple':
      case 'dropdown':
        return question.options || [];
      case 'yes_no':
        return question.yesNoOptions.map(opt => opt.text);
      default:
        return []; // Text, long text, contact info, email, phone, address don't have discrete options for logic
    }
  };

  /**
   * Finds a matching follow-up rule based on the selected value for a question.
   * @param {number} questionId - The ID of the question.
   * @param {string} selectedValue - The value selected by the user.
   * @returns {object|undefined} The matching rule object, or undefined if no match.
   */
  const getMatchingFollowUp = (questionId, selectedValue) => {
    const rules = followUpRules[questionId] || [];
    // For multiple choice, selectedValue can be an array. Need to check if any of the selected values trigger a rule.
    if (Array.isArray(selectedValue)) {
      return rules.find(rule => rule.triggerValues.some(trigger => selectedValue.includes(trigger)));
    }
    return rules.find(rule => rule.triggerValues.includes(selectedValue));
  };

  /**
   * Renders the UI for managing follow-up logic for a question.
   * @param {object} question - The question object.
   * @returns {JSX.Element} The JSX for follow-up logic section.
   */
  const renderFollowUpLogic = (question) => {
    const rules = followUpRules[question.id] || [];
    const questionOptions = getQuestionOptions(question);

    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700">Follow-up Rules</h4>
          <button
            onClick={() => addFollowUpRule(question.id)}
            className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-md text-xs hover:bg-indigo-700 transition-colors duration-200"
          >
            <Plus size={12} /> Add Rule
          </button>
        </div>

        {rules.map((rule, ruleIndex) => (
          <div key={rule.id} className="border border-gray-200 rounded-lg p-3 space-y-3 bg-white shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Rule {ruleIndex + 1}</span>
              <button
                onClick={() => deleteFollowUpRule(question.id, rule.id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
                aria-label="Delete rule"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Trigger Conditions */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Show follow-up when user selects:
              </label>
              <div className="flex gap-2 flex-wrap">
                {questionOptions.length > 0 ? questionOptions.map((option, idx) => (
                  <label key={idx} className="flex items-center text-xs text-gray-700 px-2 py-1 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition-colors duration-200">
                    <input
                      type="checkbox"
                      checked={rule.triggerValues.includes(option)}
                      onChange={(e) => {
                        const newTriggers = e.target.checked
                          ? [...rule.triggerValues, option]
                          : rule.triggerValues.filter(v => v !== option);
                        updateFollowUpRule(question.id, rule.id, 'triggerValues', newTriggers);
                      }}
                      className="mr-1 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    {option}
                  </label>
                )) : <p className="text-xs text-gray-500">No discrete options available for this question type to set up logic.</p>}
              </div>
            </div>

            {/* Follow-up Type */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Follow-up Type</label>
              <select
                value={rule.type}
                onChange={(e) => updateFollowUpRule(question.id, rule.id, 'type', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="single">Single Question</option>
                <option value="double">Two Questions</option>
              </select>
            </div>

            {/* First Follow-up Question */}
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <h5 className="text-xs font-semibold text-gray-700 mb-2">Follow-up Question 1</h5>
              <input
                type="text"
                placeholder="Question text..."
                value={rule.question1.text}
                onChange={(e) => updateFollowUpQuestion(question.id, rule.id, 1, 'text', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs mb-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <select
                value={rule.question1.type}
                onChange={(e) => updateFollowUpQuestion(question.id, rule.id, 1, 'type', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs mb-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="text">Text Box</option>
                <option value="select">Multiple Choice</option>
              </select>
              {rule.question1.type === 'select' && (
                <input
                  type="text"
                  placeholder="Options (comma-separated)"
                  value={rule.question1.options.join(', ')} // Display current options
                  onChange={(e) => {
                    const options = e.target.value.split(',').map(opt => opt.trim()).filter(opt => opt);
                    updateFollowUpQuestion(question.id, rule.id, 1, 'options', options);
                  }}
                  className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            </div>

            {/* Second Follow-up Question */}
            {rule.type === 'double' && (
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <h5 className="text-xs font-semibold text-gray-700 mb-2">Follow-up Question 2</h5>
                <input
                  type="text"
                  placeholder="Question text..."
                  value={rule.question2.text}
                  onChange={(e) => updateFollowUpQuestion(question.id, rule.id, 2, 'text', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs mb-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <select
                  value={rule.question2.type}
                  onChange={(e) => updateFollowUpQuestion(question.id, rule.id, 2, 'type', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs mb-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="text">Text Box</option>
                  <option value="select">Multiple Choice</option>
                </select>
                {rule.question2.type === 'select' && (
                  <input
                    type="text"
                    placeholder="Options (comma-separated)"
                    value={rule.question2.options.join(', ')} // Display current options
                    onChange={(e) => {
                      const options = e.target.value.split(',').map(opt => opt.trim()).filter(opt => opt);
                      updateFollowUpQuestion(question.id, rule.id, 2, 'options', options);
                    }}
                    className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-indigo-500 focus:border-indigo-500"
                  />
                )}
              </div>
            )}
          </div>
        ))}

        {rules.length === 0 && (
          <p className="text-xs text-gray-500 text-center py-2">
            No follow-up rules yet. Click "Add Rule" to create conditional follow-up questions.
          </p>
        )}
      </div>
    );
  };

  /**
   * Renders the follow-up questions in the preview section based on selected value.
   * This function now takes the current `previewResponses` to determine if follow-ups should show.
   * @param {object} question - The parent question object.
   * @param {*} selectedValue - The value selected by the user for the parent question (can be string or array).
   * @returns {JSX.Element|null} The JSX for follow-up questions or null if no match.
   */
  const renderPreviewFollowUps = (question, selectedValue) => {
    // Only render follow-ups if a selection has been made for the current question
    if (selectedValue === undefined || selectedValue === null || (Array.isArray(selectedValue) && selectedValue.length === 0)) {
      return null;
    }

    const rules = followUpRules[question.id] || [];
    const matchingRule = getMatchingFollowUp(question.id, selectedValue); // Use the helper to find matching rule
    if (!matchingRule) return null;

    return (
      <div className="mt-3 border-t border-gray-200 pt-3">
        <div className="text-indigo-600 text-xs font-semibold mb-2">Follow-up Questions</div>

        {/* First Follow-up */}
        <div className="mb-3">
          <div className="text-xs font-medium text-gray-700 mb-1">
            {matchingRule.question1.text || 'Follow-up question 1...'}
          </div>
          {matchingRule.question1.type === 'text' ? (
            <textarea
              className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your answer..."
              rows="2"
              // No state management for follow-up responses in this mockup, just visual
            />
          ) : (
            <select className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Select an option...</option>
              {matchingRule.question1.options.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </select>
          )}
        </div>

        {/* Second Follow-up (if double type) */}
        {matchingRule.type === 'double' && (
          <div className="mb-3">
            <div className="text-xs font-medium text-gray-700 mb-1">
              {matchingRule.question2.text || 'Follow-up question 2...'}
            </div>
            {matchingRule.question2.type === 'text' ? (
              <textarea
                className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your answer..."
                rows="2"
                // No state management for follow-up responses in this mockup, just visual
              />
            ) : (
              <select className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">Select an option...</option>
                {matchingRule.question2.options.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
            )}
          </div>
        )}
      </div>
    );
  };

  /**
   * Handles the selection of a response in the preview mode.
   * This is crucial for triggering follow-up questions.
   * @param {number} questionId - The ID of the question being responded to.
   * @param {string|Array|object} value - The value selected by the user. Can be string, array (for multi-select), or object (for contact/matrix).
   */
  const handlePreviewResponse = (questionId, value) => {
    setPreviewResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  /**
   * Inserts the dynamic variable placeholder into the question label at the current cursor position.
   */
  const insertDynamicVariablePlaceholder = (questionId) => {
    const inputElement = questionLabelRefs.current[questionId];
    if (inputElement) {
      const start = inputElement.selectionStart;
      const end = inputElement.selectionEnd;
      const currentValue = inputElement.value;
      const textToInsert = '{{Dynamic Variable}}';

      const newValue = currentValue.substring(0, start) + textToInsert + currentValue.substring(end);

      // Update the state
      handleChange(questionId, 'label', newValue);

      // Set a timeout to ensure the DOM updates before trying to set selection range
      setTimeout(() => {
        inputElement.selectionStart = start + textToInsert.length;
        inputElement.selectionEnd = start + textToInsert.length;
        inputElement.focus();
      }, 0);
    }
  };

  /**
   * Handles navigation to the next question in the preview.
   * This will always move to the next primary question.
   */
  const goToNextPreviewQuestion = () => {
    // Check if there are follow-up questions and if they are answered (mock check for now)
    const currentQuestionResponse = previewResponses[currentPreviewQuestion.id];
    const matchingRule = getMatchingFollowUp(currentPreviewQuestion.id, currentQuestionResponse);

    if (matchingRule && (currentQuestionResponse === undefined || currentQuestionResponse === null || (Array.isArray(currentQuestionResponse) && currentQuestionResponse.length === 0))) {
      // If there's a follow-up rule but no answer for the primary question, alert or prevent navigation
      alert("Please answer the current question to proceed.");
      return;
    }


    if (currentPreviewPage < questions.length - 1) {
      setCurrentPreviewPage(prev => prev + 1);
      setSurveyCompleted(false); // Ensure survey not marked as completed
    } else {
      // End of survey
      setSurveyCompleted(true); // Mark survey as completed
      // No alert here, will show thank you message
    }
  };

  const resetPreview = () => {
    setCurrentPreviewPage(0);
    setPreviewResponses({});
    setSurveyCompleted(false); // Reset survey completion status
  };

  const currentPreviewQuestion = questions[currentPreviewPage];

  return (
    <div className="flex flex-col lg:flex-row h-screen p-4 lg:p-8 bg-gray-50">
      {/* Left Sidebar: Question Builder & Style Section */}
      <aside className="w-full lg:w-2/5 lg:pr-6 overflow-y-auto border-r border-gray-200">
        {/* Style Section */}
        <div className="bg-white p-6 shadow-xl rounded-xl border border-indigo-200 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Style</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image Upload (Optional)</label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
                onChange={handleBannerImageUpload}
              />
              {uploadedBannerImageUrl && (
                <p className="text-xs text-gray-500 mt-2">Image uploaded successfully!</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Title</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={surveyStyles.feedbackTitle}
                onChange={(e) => setSurveyStyles({ ...surveyStyles, feedbackTitle: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Description</label>
              <textarea
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:ring-indigo-500 focus:border-indigo-500"
                value={surveyStyles.feedbackDescription}
                onChange={(e) => setSurveyStyles({ ...surveyStyles, feedbackDescription: e.target.value })}
                rows="3"
              />
            </div>
            <div className='w-25'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
              <input
                type="color"
                className="w-full h-10 rounded-md border border-gray-300 cursor-pointer"
                value={surveyStyles.themeColor}
                onChange={(e) => setSurveyStyles({ ...surveyStyles, themeColor: e.target.value })}
              />
            </div>
            <div className='w-25 mt-4'>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Color</label>
            <input
              type="color"
              className="w-full h-10 rounded-md border border-gray-300 cursor-pointer"
              value={surveyStyles.buttonColor}
              onChange={(e) => setSurveyStyles({ ...surveyStyles, buttonColor: e.target.value })}
            />
          </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thank You Message</label>
              <textarea
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Your feedback is valuable to us!"
                value={surveyStyles.thankYouMessage}
                onChange={(e) => setSurveyStyles({ ...surveyStyles, thankYouMessage: e.target.value })}
                rows="2"
              />
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white p-6 shadow-xl rounded-xl border border-indigo-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 sm:mb-0">Questions</h2>
            <button
              onClick={() => setShowLibrary(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 text-white rounded-md shadow-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <Plus className="text-base" /> Add question
            </button>
          </div>

          <div className="space-y-6">
            {questions.length > 0 ? (
              questions.map((question, qIndex) => {
                const currentView = questionViews[question.id] || 'content';
                return (
                  <div
                    key={question.id}
                    className="p-6 bg-white rounded-xl shadow-md space-y-6 border border-gray-200 relative"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-lg font-semibold text-gray-800">Question</div>
                        <div className="text-sm text-indigo-500 capitalize">{question.type.replace('_', ' ')}</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {/* Required Toggle */}
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={question.required}
                            onChange={(e) => handleChange(question.id, 'required', e.target.checked)}
                          />
                          <div className="relative w-11 h-6 rounded-full
                              bg-gray-300 dark:bg-gray-300
                              peer-checked:bg-green-500 dark:peer-checked:bg-green-700
                              after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                              peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                              focus:outline-none focus:ring-0 focus:shadow-none">
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-700">Required</span>
                        </label>
                        {/* More Options Dropdown */}
                        <div className="relative">
                          <button
                            className="text-gray-600 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100 transition"
                            onClick={() => setDropdownOpenId(dropdownOpenId === question.id ? null : question.id)}
                            aria-label="More options"
                          >
                            <MoreVertical size={20} />
                          </button>
                          {dropdownOpenId === question.id && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
                              <button
                                onClick={() => handleDuplicate(question)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 rounded-md"
                              >
                                Duplicate
                              </button>
                            </div>
                          )}
                        </div>
                        {/* Delete Button */}
                        <button
                          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
                          onClick={() => setQuestions(qs => qs.filter(q => q.id !== question.id))}
                          aria-label="Delete question"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>

                    {/* View Toggles (Details/Logic) */}
                    <div className="flex space-x-4 pb-2 border-b border-gray-100">
                      <button
                        className={`text-sm font-medium pb-1 ${currentView === 'content' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => handleToggleView(question.id, 'content')}
                      >
                        Details
                      </button>
                      <button
                        className={`text-sm font-medium pb-1 ${currentView === 'logic' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => handleToggleView(question.id, 'logic')}
                      >
                        Logic
                      </button>
                    </div>

                    {/* Question Content/Logic Editor */}
                    {currentView === 'content' ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Question Title</label>
                          <div className="flex items-center gap-2"> {/* Flex container for input and button */}
                            <input
                              ref={el => questionLabelRefs.current[question.id] = el} // Assign ref
                              type="text"
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                              value={question.label}
                              onChange={(e) => handleChange(question.id, 'label', e.target.value)}
                            />
                            <button
                              onClick={() => insertDynamicVariablePlaceholder(question.id)}
                              className="flex-shrink-0 px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-xs hover:bg-gray-200 transition-colors duration-200"
                              title="Insert dynamic variable placeholder"
                            >
                              {'Add Variable'}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                          <textarea
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Add a description to help respondents understand the question..."
                            value={question.description || ''}
                            onChange={(e) => handleChange(question.id, 'description', e.target.value)}
                            rows="2"
                          />
                        </div>

                        {/* Type-specific inputs for question details */}
                        {question.type === 'multiple' && (
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Choices</label>
                            {(question.options || []).map((opt, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={opt}
                                  onChange={(e) => {
                                    const updatedOptions = [...question.options];
                                    updatedOptions[i] = e.target.value;
                                    handleChange(question.id, 'options', updatedOptions);
                                  }}
                                  className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full focus:ring-indigo-500 focus:border-indigo-500"
                                  placeholder={`Option ${i + 1}`}
                                />
                                <button
                                  onClick={() => handleChange(question.id, 'options', question.options.filter((_, idx) => idx !== i))}
                                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
                                  aria-label="Remove option"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ))}
                            <button
                              className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1 mt-2"
                              onClick={() => handleChange(question.id, 'options', [...(question.options || []), 'New Option'])}
                            >
                              <Plus size={14} /> Add choice
                            </button>
                          </div>
                        )}

                        {question.type === 'dropdown' && (
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dropdown Options</label>
                            {(question.options || []).map((opt, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={opt}
                                  onChange={(e) => {
                                    const updatedOptions = [...question.options];
                                    updatedOptions[i] = e.target.value;
                                    handleChange(question.id, 'options', updatedOptions);
                                  }}
                                  className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full focus:ring-indigo-500 focus:border-indigo-500"
                                  placeholder={`Option ${i + 1}`}
                                />
                                <button
                                  onClick={() => handleChange(question.id, 'options', question.options.filter((_, idx) => idx !== i))}
                                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
                                  aria-label="Remove option"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ))}
                            <button
                              className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1 mt-2"
                              onClick={() => handleChange(question.id, 'options', [...(question.options || []), 'New Option'])}
                            >
                              <Plus size={14} /> Add option
                            </button>
                          </div>
                        )}

                        {question.type === 'yes_no' && (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Yes Option Text</label>
                              <input
                                type="text"
                                value={question.yesNoOptions[0].text}
                                onChange={(e) => handleNestedChange(question.id, 'yesNoOptions', 0, 'text', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">No Option Text</label>
                              <input
                                type="text"
                                value={question.yesNoOptions[1].text}
                                onChange={(e) => handleNestedChange(question.id, 'yesNoOptions', 1, 'text', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                              />
                            </div>
                            <label className="inline-flex items-center cursor-pointer text-sm font-medium text-gray-700">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={question.displayAsThumbs}
                                onChange={(e) => handleChange(question.id, 'displayAsThumbs', e.target.checked)}
                              />
                              <div className="relative w-11 h-6 rounded-full bg-gray-300 dark:bg-gray-300 peer-checked:bg-indigo-500 dark:peer-checked:bg-indigo-700 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full focus:outline-none focus:ring-0 focus:shadow-none"></div>
                              <span className="ml-2">Display as Thumbs Up/Down</span>
                            </label>
                          </div>
                        )}

                        {(question.type === 'rating' || question.type === 'star_rating' || question.type === 'emoji_rating' || question.type === 'likert_scale') && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {question.type !== 'rating' && ( // NPS is fixed 10 scale
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Scale</label>
                                <select
                                  value={question.scale}
                                  onChange={(e) => handleChange(question.id, 'scale', parseInt(e.target.value))}
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                  <option value={3}>3 Scale</option>
                                  <option value={5}>5 Scale</option>
                                  <option value={7}>7 Scale</option>
                                </select>
                              </div>
                            )}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Low Score Label</label>
                              <input
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                value={question.lowScoreLabel}
                                onChange={(e) => handleChange(question.id, 'lowScoreLabel', e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">High Score Label</label>
                              <input
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                value={question.highScoreLabel}
                                onChange={(e) => handleChange(question.id, 'highScoreLabel', e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        {question.type === 'contact_info' && (
                          <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700">Include Fields:</label>
                            <label className="inline-flex items-center text-sm text-gray-700">
                              <input
                                type="checkbox"
                                checked={question.fields.email}
                                onChange={(e) => handleContactInfoFieldChange(question.id, 'email', e.target.checked)}
                                className="rounded text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="ml-2">Email</span>
                            </label>
                            <label className="inline-flex items-center text-sm text-gray-700 ml-4">
                              <input
                                type="checkbox"
                                checked={question.fields.phoneNumber}
                                onChange={(e) => handleContactInfoFieldChange(question.id, 'phoneNumber', e.target.checked)}
                                className="rounded text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="ml-2">Phone Number</span>
                            </label>
                            <label className="inline-flex items-center text-sm text-gray-700 ml-4">
                              <input
                                type="checkbox"
                                checked={question.fields.address}
                                onChange={(e) => handleContactInfoFieldChange(question.id, 'address', e.target.checked)}
                                className="rounded text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="ml-2">Address</span>
                            </label>
                          </div>
                        )}

                        {question.type === 'matrix' && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Rows (comma-separated)</label>
                              <input
                                type="text"
                                value={question.rows.join(', ')}
                                onChange={(e) => handleChange(question.id, 'rows', e.target.value.split(',').map(s => s.trim()))}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Columns (comma-separated)</label>
                              <input
                                type="text"
                                value={question.columns.join(', ')}
                                onChange={(e) => handleChange(question.id, 'columns', e.target.value.split(',').map(s => s.trim()))}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Matrix Cell Type</label>
                              <select
                                value={question.matrixType}
                                onChange={(e) => handleChange(question.id, 'matrixType', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                              >
                                <option value="multiple">Multiple Choice</option>
                                <option value="rating">Rating (1-5)</option>
                              </select>
                            </div>
                            {question.matrixType === 'multiple' && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cell Options (comma-separated)</label>
                                <input
                                  type="text"
                                  value={question.matrixOptions.join(', ')}
                                  onChange={(e) => handleChange(question.id, 'matrixOptions', e.target.value.split(',').map(s => s.trim()))}
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                              </div>
                            )}
                          </div>
                        )}

                        {/* Button Text */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={question.buttonText}
                            onChange={(e) => handleChange(question.id, 'buttonText', e.target.value)}
                          />
                        </div>

                        {/* Navigation Logic */}
                       
                      </>
                    ) : (
                      <>
                       
                        {renderFollowUpLogic(question)}
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500 py-8">No questions added yet. Use the "Add question" button above to start building your form.</p>
            )}
          </div>
        </div>

        {/* Form Element Library Modal */}
        {showLibrary && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
              <FormElementLibrary
                onSelect={handleAddQuestion}
                onClose={() => setShowLibrary(false)}
              />
            </div>
          </div>
        )}
      </aside>

      {/* Right Main Section: Phone Preview */}
      <main className="w-full lg:w-3/5 flex flex-col items-center p-4 lg:p-0 bg-gradient-to-br from-indigo-100 to-white rounded-lg shadow">
        {/* Preview Mode Toggle */}
        <div className="mb-4 flex space-x-2 mt-4">
          <button
            onClick={() => setPreviewMode('mobile')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              previewMode === 'mobile' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Mobile Preview
          </button>
          <button
            onClick={() => setPreviewMode('web')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              previewMode === 'web' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Web Preview
          </button>
        </div>

        {previewMode === 'mobile' ? (
        <MobilePreviewContainer
        uploadedBannerImageUrl={uploadedBannerImageUrl}
        questions={questions}
        currentPreviewPage={currentPreviewPage}
        resetPreview={resetPreview}
      >
        {surveyCompleted ? (
  <div className="">
   <div className="flex justify-center items-center">
  <FaThumbsUp size={50} className="text-gray-700" style={{ color: surveyStyles.themeColor }}/>
</div>


    <h2 className="text-xl  font-bold mt-5 mb-2 text-white-800"style={{ color: surveyStyles.themeColor }}>Thank you for your response!</h2>
    <p className="text-sm  text-white-500">We appreciate your time.</p>
  </div>
) : questions.length > 0 ? (
                    // Only render the current question based on currentPreviewPage
                    currentPreviewQuestion ? (
                      <div className="">
                      {/* Primary question */}
                      <div>
                        <div className="text-indigo-600 text-base font-semibold mt-2 mb-1" style={{ color: surveyStyles.themeColor }}>
                          Question {currentPreviewPage + 1} of {questions.length}
                        </div>
                        <div className="text-xl font-semibold text-gray-800 mt-5" style={{ color: surveyStyles.themeColor }}>
                          {replaceDynamicVariable(currentPreviewQuestion.label)}
                        </div>
                        <p className="text-gray-500 italic text-xs mb-4"style={{ color: surveyStyles.themeColor }}>
                          {replaceDynamicVariable(currentPreviewQuestion.description) || 'Description (optional)'}
                        </p>
                    
                       {currentPreviewQuestion.type === 'text' && (
                                              <input
                                                className="border border-indigo-300 px-3 py-2 w-full rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Your answer"
                                                type="text"
                                                // For text input, we need to update previewResponses manually
                                                onChange={(e) => handlePreviewResponse(currentPreviewQuestion.id, e.target.value)}
                                                value={previewResponses[currentPreviewQuestion.id] || ''}
                                              />
                                            )}
                    
                                            {currentPreviewQuestion.type === 'long_text' && (
                                              <textarea
                                                className="border border-indigo-300 px-3 py-2 w-full rounded-md text-sm resize-y focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Your detailed answer"
                                                rows="4"
                                                onChange={(e) => handlePreviewResponse(currentPreviewQuestion.id, e.target.value)}
                                                value={previewResponses[currentPreviewQuestion.id] || ''}
                                              />
                                            )}
                    
                                            {currentPreviewQuestion.type === 'email' && (
                                              <input
                                                className="border border-indigo-300 px-3 py-2 w-full rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="your@example.com"
                                                type="email"
                                                onChange={(e) => handlePreviewResponse(currentPreviewQuestion.id, e.target.value)}
                                                value={previewResponses[currentPreviewQuestion.id] || ''}
                                              />
                                            )}
                    
                                            {currentPreviewQuestion.type === 'phone_number' && (
                                              <input
                                                className="border border-indigo-300 px-3 py-2 w-full rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="e.g., 123-456-7890"
                                                type="tel"
                                                onChange={(e) => handlePreviewResponse(currentPreviewQuestion.id, e.target.value)}
                                                value={previewResponses[currentPreviewQuestion.id] || ''}
                                              />
                                            )}
                    
                                            {currentPreviewQuestion.type === 'address' && (
                                              <input
                                                className="border border-indigo-300 px-3 py-2 w-full rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Street, City, State, Zip"
                                                type="text"
                                                onChange={(e) => handlePreviewResponse(currentPreviewQuestion.id, e.target.value)}
                                                value={previewResponses[currentPreviewQuestion.id] || ''}
                                              />
                                            )}
                    
                                            {currentPreviewQuestion.type === 'contact_info' && (
                                              <div className="space-y-2">
                                                {currentPreviewQuestion.fields.email && (
                                                  <input
                                                    className="border border-indigo-300 px-3 py-2 w-full rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Email"
                                                    type="email"
                                                    onChange={(e) => handlePreviewResponse(currentPreviewQuestion.id, { ...previewResponses[currentPreviewQuestion.id], email: e.target.value })}
                                                    value={previewResponses[currentPreviewQuestion.id]?.email || ''}
                                                  />
                                                )}
                                                {currentPreviewQuestion.fields.phoneNumber && (
                                                  <input
                                                    className="border border-indigo-300 px-3 py-2 w-full rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Phone Number"
                                                    type="tel"
                                                    onChange={(e) => handlePreviewResponse(currentPreviewQuestion.id, { ...previewResponses[currentPreviewQuestion.id], phoneNumber: e.target.value })}
                                                    value={previewResponses[currentPreviewQuestion.id]?.phoneNumber || ''}
                                                  />
                                                )}
                                                {currentPreviewQuestion.fields.address && (
                                                  <input
                                                    className="border border-indigo-300 px-3 py-2 w-full rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Address"
                                                    type="text"
                                                    onChange={(e) => handlePreviewResponse(currentPreviewQuestion.id, { ...previewResponses[currentPreviewQuestion.id], address: e.target.value })}
                                                    value={previewResponses[currentPreviewQuestion.id]?.address || ''}
                                                  />
                                                )}
                                              </div>
                                            )}
                    
                                            {currentPreviewQuestion.type === 'multiple' && (
                                              <div className="space-y-2">
                                                {(currentPreviewQuestion.options || []).map((opt, i) => (
                                                  <label key={i} className="flex items-center text-sm text-gray-700 cursor-pointer">
                                                    <input
                                                      type="checkbox"
                                                      name={`question-${currentPreviewQuestion.id}`}
                                                      className="mr-2 text-indigo-600 rounded focus:ring-indigo-500"
                                                      onChange={(e) => {
                                                        // For multiple choice, handle multiple selections
                                                        const currentSelections = previewResponses[currentPreviewQuestion.id] || [];
                                                        if (e.target.checked) {
                                                          handlePreviewResponse(currentPreviewQuestion.id, [...currentSelections, opt]);
                                                        } else {
                                                          handlePreviewResponse(currentPreviewQuestion.id, currentSelections.filter(item => item !== opt));
                                                        }
                                                      }}
                                                      checked={(previewResponses[currentPreviewQuestion.id] || []).includes(opt)}
                                                    />
                                                    {opt}
                                                  </label>
                                                ))}
                                              </div>
                                            )}
                    
                                            {currentPreviewQuestion.type === 'dropdown' && (
                                              <select
                                                className="w-full border border-indigo-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                onChange={(e) => handlePreviewResponse(currentPreviewQuestion.id, e.target.value)}
                                                value={previewResponses[currentPreviewQuestion.id] || ''}
                                              >
                                                <option value="">Select an option...</option>
                                                {(currentPreviewQuestion.options || []).map((opt, i) => (
                                                  <option key={i} value={opt}>{opt}</option>
                                                ))}
                                              </select>
                                            )}
                    
                                            {currentPreviewQuestion.type === 'yes_no' && (
                                              <div className="flex justify-around py-2">
                                                {currentPreviewQuestion.displayAsThumbs ? (
                                                  <>
                                                    <button
                                                      onClick={() => handlePreviewResponse(currentPreviewQuestion.id, currentPreviewQuestion.yesNoOptions[0].text)}
                                                      className={`flex items-center justify-center p-2 rounded-full text-4xl transition-colors duration-200
                                                        ${previewResponses[currentPreviewQuestion.id] === currentPreviewQuestion.yesNoOptions[0].text ? 'text-green-500' : 'text-gray-400 hover:text-green-400'}`}
                                                      aria-label={currentPreviewQuestion.yesNoOptions[0].text}
                                                    >
                                                      <ThumbsUp size={40} fill="currentColor" />
                                                    </button>
                                                    <button
                                                      onClick={() => handlePreviewResponse(currentPreviewQuestion.id, currentPreviewQuestion.yesNoOptions[1].text)}
                                                      className={`flex items-center justify-center p-2 rounded-full text-4xl transition-colors duration-200
                                                        ${previewResponses[currentPreviewQuestion.id] === currentPreviewQuestion.yesNoOptions[1].text ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
                                                      aria-label={currentPreviewQuestion.yesNoOptions[1].text}
                                                    >
                                                      <ThumbsDown size={40} fill="currentColor" />
                                                    </button>
                                                  </>
                                                ) : (
                                                  <>
                                                    <button
                                                      onClick={() => handlePreviewResponse(currentPreviewQuestion.id, currentPreviewQuestion.yesNoOptions[0].text)}
                                                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                                                        ${previewResponses[currentPreviewQuestion.id] === currentPreviewQuestion.yesNoOptions[0].text ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                                    >
                                                      {currentPreviewQuestion.yesNoOptions[0].text}
                                                    </button>
                                                    <button
                                                      onClick={() => handlePreviewResponse(currentPreviewQuestion.id, currentPreviewQuestion.yesNoOptions[1].text)}
                                                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                                                        ${previewResponses[currentPreviewQuestion.id] === currentPreviewQuestion.yesNoOptions[1].text ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                                    >
                                                      {currentPreviewQuestion.yesNoOptions[1].text}
                                                    </button>
                                                  </>
                                                )}
                                              </div>
                                            )}
                    
                                            {currentPreviewQuestion.type === 'rating' && ( // NPS (1-10 scale)
                                              <div className="flex justify-between py-2 overflow-x-auto">
                                                {Array.from({ length: currentPreviewQuestion.scale }, (_, i) => (i + 1)).map((n) => (
                                                  <button
                                                    key={n}
                                                    onClick={() => handlePreviewResponse(currentPreviewQuestion.id, n.toString())}
                                                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold border transition-all duration-200
                                                      ${previewResponses[currentPreviewQuestion.id] === n.toString()
                                                        ? 'bg-indigo-600 text-white border-indigo-600 scale-110'
                                                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                                                      }`}
                                                  >
                                                    {n}
                                                  </button>
                                                ))}
                                              </div>
                                            )}
                    
                                            {currentPreviewQuestion.type === 'star_rating' && (
                                              <div className="flex justify-around py-2">
                                                {Array.from({ length: currentPreviewQuestion.scale }, (_, i) => (i + 1)).map((n) => (
                                                  <button
                                                    key={n}
                                                    onClick={() => handlePreviewResponse(currentPreviewQuestion.id, n.toString())}
                                                    className={`text-2xl p-1 rounded-full transition-colors duration-200
                                                      ${previewResponses[currentPreviewQuestion.id] === n.toString()
                                                        ? 'text-yellow-400 scale-110'
                                                        : 'text-gray-300 hover:text-yellow-300'
                                                      }`}
                                                    aria-label={`Rate ${n} star`}
                                                  >
                                                    <Star size={24} fill="currentColor" />
                                                  </button>
                                                ))}
                                              </div>
                                            )}
                    
                                            {currentPreviewQuestion.type === 'emoji_rating' && (
                                              <div className="flex justify-around py-2">
                                                {Array.from({ length: currentPreviewQuestion.scale }, (_, i) => (i + 1)).map((n) => {
                                                  let emoji = '';
                                                  if (currentPreviewQuestion.scale === 3) {
                                                    emoji = n === 1 ? '🙁' : n === 2 ? '😐' : '😊';
                                                  } else if (currentPreviewQuestion.scale === 5) {
                                                    emoji = n === 1 ? '😠' : n === 2 ? '🙁' : n === 3 ? '😐' : n === 4 ? '🙂' : '�';
                                                  } else if (currentPreviewQuestion.scale === 7) {
                                                    emoji = ['😡', '🙁', '😒', '😐', '🙂', '😁', '🤩'][n - 1];
                                                  }
                                                  return (
                                                    <button
                                                      key={n}
                                                      onClick={() => handlePreviewResponse(currentPreviewQuestion.id, n.toString())}
                                                      className={`text-2xl p-1 rounded-full transition-transform duration-200
                                                        ${previewResponses[currentPreviewQuestion.id] === n.toString() ? 'scale-125' : ''}`}
                                                      aria-label={`Rate ${n} emoji`}
                                                    >
                                                      {emoji}
                                                    </button>
                                                  );
                                                })}
                                              </div>
                                            )}
                    
                                            {currentPreviewQuestion.type === 'likert_scale' && (
                                              <div className="space-y-2">
                                                <div className="flex justify-between text-xs text-gray-600">
                                                  <span>{currentPreviewQuestion.lowScoreLabel}</span>
                                                  <span>{currentPreviewQuestion.highScoreLabel}</span>
                                                </div>
                                                <div className="flex justify-between py-2">
                                                  {Array.from({ length: currentPreviewQuestion.scale }, (_, i) => (i + 1)).map((n) => (
                                                    <button
                                                      key={n}
                                                      onClick={() => handlePreviewResponse(currentPreviewQuestion.id, n.toString())}
                                                      className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold border transition-all duration-200
                                                        ${previewResponses[currentPreviewQuestion.id] === n.toString()
                                                          ? 'bg-indigo-600 text-white border-indigo-600 scale-110'
                                                          : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                      {n}
                                                    </button>
                                                  ))}
                                                </div>
                                              </div>
                                            )}
                    
                                            {currentPreviewQuestion.type === 'matrix' && (
                                              <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                                                  <thead className="bg-gray-50">
                                                    <tr>
                                                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"></th>
                                                      {currentPreviewQuestion.columns.map((col, colIdx) => (
                                                        <th key={colIdx} className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                          {col}
                                                        </th>
                                                      ))}
                                                    </tr>
                                                  </thead>
                                                  <tbody className="bg-white divide-y divide-gray-200">
                                                    {currentPreviewQuestion.rows.map((row, rowIdx) => (
                                                      <tr key={rowIdx}>
                                                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                                          {row}
                                                        </td>
                                                        {currentPreviewQuestion.columns.map((col, colIdx) => (
                                                          <td key={colIdx} className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-center">
                                                            {currentPreviewQuestion.matrixType === 'multiple' ? (
                                                              <div className="flex flex-wrap justify-center gap-1">
                                                                {(currentPreviewQuestion.matrixOptions || []).map((opt, optIdx) => (
                                                                  <label key={optIdx} className="flex items-center text-xs">
                                                                    <input
                                                                      type="checkbox"
                                                                      name={`matrix-${currentPreviewQuestion.id}-${rowIdx}-${colIdx}`}
                                                                      value={opt}
                                                                      className="rounded text-indigo-600 focus:ring-indigo-500"
                                                                      // Simulate selection for preview
                                                                      onChange={(e) => {
                                                                        const key = `${row}-${col}`;
                                                                        const currentMatrixSelections = previewResponses[currentPreviewQuestion.id]?.[key] || [];
                                                                        handlePreviewResponse(currentPreviewQuestion.id, {
                                                                          ...(previewResponses[currentPreviewQuestion.id] || {}), // Ensure existing object is spread
                                                                          [key]: e.target.checked
                                                                            ? [...currentMatrixSelections, opt]
                                                                            : currentMatrixSelections.filter(item => item !== opt)
                                                                        });
                                                                      }}
                                                                      checked={(previewResponses[currentPreviewQuestion.id]?.[`${row}-${col}`] || []).includes(opt)}
                                                                    />
                                                                    <span className="ml-1">{opt}</span>
                                                                  </label>
                                                                ))}
                                                              </div>
                                                            ) : ( // Rating 1-5
                                                              <div className="flex justify-center gap-1">
                                                                {[1, 2, 3, 4, 5].map((n) => (
                                                                  <button
                                                                    key={n}
                                                                    onClick={() => handlePreviewResponse(currentPreviewQuestion.id, {
                                                                      ...(previewResponses[currentPreviewQuestion.id] || {}), // Ensure existing object is spread
                                                                      [`${row}-${col}`]: n.toString()
                                                                    })}
                                                                    className={`text-base ${
                                                                      previewResponses[currentPreviewQuestion.id]?.[`${row}-${col}`] === n.toString()
                                                                        ? 'text-yellow-400'
                                                                        : 'text-gray-300'
                                                                    } hover:text-yellow-400`}
                                                                  >
                                                                    <Star size={16} fill="currentColor" />
                                                                  </button>
                                                                ))}
                                                              </div>
                                                            )}
                                                          </td>
                                                        ))}
                                                      </tr>
                                                    ))}
                                                  </tbody>
                                                </table>
                                              </div>
                                            )}
                    
                        {renderPreviewFollowUps(currentPreviewQuestion, previewResponses[currentPreviewQuestion.id])}
                      </div>
                    
                      {/* Navigation Button */}
                      <div className="flex justify-between items-center pt-4">
        {currentPreviewPage > 0 ? (
          <button
            onClick={goToPreviousPreviewQuestion}
            className="px-4 py-2 rounded-full font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Previous
          </button>
        ) : <div />}

        <button
          onClick={goToNextPreviewQuestion}
          className="px-6 py-2 rounded-full font-semibold shadow hover:opacity-90 transition"
          style={{
            backgroundColor: surveyStyles.buttonColor || '#000000',
            color: getContrastTextColor(surveyStyles.themeColor || '#000000'),
          }}
        >
          {currentPreviewPage === questions.length - 1 ? 'Submit' : currentPreviewQuestion.buttonText || 'Next'}
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
      <p className="text-lg mb-2">No questions defined.</p>
      <p className="text-sm">Add questions on the left to see the preview.</p>
    </div>
  )
) : (
  <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
    <p className="text-lg mb-2">Your form preview will appear here.</p>
    <p className="text-sm">Start by adding questions on the left.</p>
  </div>
)}
        </MobilePreviewContainer>
        ) : (
          <div className="h-[500px] w-full max-w-2xl ring-8 ring-indigo-200 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 shadow-2xl flex items-center justify-center text-gray-600 text-xl font-semibold">
            Web Preview (Coming Soon!)
          </div>
        )}

        {/* Reset Survey Button */}
        {questions.length > 0 && previewMode === 'mobile' && (
          <div className="mt-4 text-center">
            <button
              onClick={resetPreview}
              className="px-4 py-2 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600 transition-colors duration-200 shadow-md"
            >
              Reset Survey
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

// App component to wrap the TypeformBuilder
const App = () => {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <TypeformBuilder />
    </div>
  );
};

export default App;
