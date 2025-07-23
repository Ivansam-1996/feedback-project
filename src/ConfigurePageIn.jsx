import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const ConfigurePage = () => {
  const [title, setTitle] = useState('Welcome to Our Feedback');
  const [welcome, setWelcome] = useState('We value your input.');
  const [thankYou, setThankYou] = useState('Thanks for your time!');
  const [themeColor, setThemeColor] = useState('#6366f1'); // indigo
  const [banner, setBanner] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const dummyQuestions = [
    {
      id: 1,
      label: 'How satisfied are you with our product?',
      description: 'Rate from 1 to 5',
      type: 'rating',
    },
    {
      id: 2,
      label: 'What can we improve?',
      description: '',
      type: 'text',
    },
  ];

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBanner(url);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="flex h-screen font-poppins">
      {/* LEFT PANEL: Config Options */}
      <aside className="w-2/5 pr-6 overflow-y-auto">
        <div className="bg-white p-6 shadow-xl rounded-xl border border-indigo-200 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">Configure Feedback Design</h2>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Page Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Welcome Message</label>
            <textarea
              value={welcome}
              onChange={(e) => setWelcome(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Thank You Message</label>
            <textarea
              value={thankYou}
              onChange={(e) => setThankYou(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Theme Color</label>
            <input
              type="color"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
              className="w-16 h-10 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Upload Banner</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerUpload}
              className="text-sm"
            />
            
          </div>
        </div>
      </aside>

      {/* RIGHT PANEL: Mobile Preview */}
      <main className="w-3/5 flex justify-center items-center bg-gradient-to-br from-indigo-100 to-white rounded-lg shadow">
        <div
          className="relative h-[650px] w-[340px] ring-8 rounded-3xl bg-white shadow-2xl overflow-hidden"
          style={{ borderColor: themeColor }}
        >
          {/* Mobile top/bottom bars */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-6 rounded-b-xl bg-black"></div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[40%] h-1 rounded-full bg-black"></div>

          <div className="overflow-y-auto h-full mt-8 px-4 pb-6 space-y-4">
            {banner && <img src={banner} alt="Banner" className="w-full h-28 object-cover rounded-md" />}
            
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center h-full py-20">
                <FaCheckCircle className="text-green-500 text-5xl mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h2>
                <p className="text-sm text-gray-600">{thankYou}</p>
              </div>
            ) : (
              <>
                <h2 className="text-base font-bold text-black">{title}</h2>
                <p className="text-sm text-gray-500 mb-4">{welcome}</p>

                {dummyQuestions.map((q) => (
                  <div
                  key={q.id}
                  className="p-4 rounded bg-white"
                  style={{ border: `1px solid ${themeColor}` }}
                >
                    <div className="text-xs mb-1" style={{ color: themeColor }}>{q.type === 'rating' ? 'Rating' : 'Text'} Question</div>
                    <div className="text-sm font-semibold text-black mb-1">{q.label}</div>
                    <p className="text-gray-400 italic text-xs mb-2">
                      {q.description || 'No description'}
                    </p>
                    {q.type === 'text' && (
                      <input
                        className="border border-indigo-300 px-2 py-1 w-full rounded text-xs"
                        placeholder="Your answer"
                        disabled
                      />
                    )}
                    {q.type === 'rating' && (
                      <div className="flex justify-between">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span key={n} className="text-xl" style={{ color: themeColor }}>⭐</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Submit Button */}
                 <button
                onClick={handleSubmit}
                style={{ backgroundColor: themeColor }}
                className="mt-4 w-full text-white py-2 px-4 rounded text-sm font-medium hover:opacity-90 transition"
                >
                Submit
                </button>

              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfigurePage;
