import React from 'react';

const WordCloudMock = () => {
  const keywords = [
    { word: "Affordable", size: "text-4xl", color: "text-green-600" },
  { word: "Clean Store", size: "text-3xl", color: "text-indigo-500" },
  { word: "Helpful Staff", size: "text-2xl", color: "text-green-500" },
  { word: "Easy Returns", size: "text-xl", color: "text-blue-500" },
  { word: "Discounts", size: "text-3xl", color: "text-indigo-600" },
  { word: "Great Offers", size: "text-xl", color: "text-green-700" },
  { word: "Well Organized", size: "text-2xl", color: "text-indigo-700" },
  { word: "Fast Billing", size: "text-xl", color: "text-green-400" },
  { word: "Friendly Staff", size: "text-2xl", color: "text-blue-600" },
  { word: "Neat Aisles", size: "text-xl", color: "text-indigo-400" },
  { word: "Wide Variety", size: "text-xl", color: "text-green-600" },
  { word: "Loyalty Rewards", size: "text-lg", color: "text-indigo-500" },
  { word: "Quick Checkout", size: "text-xl", color: "text-green-500" },
  { word: "Product Availability", size: "text-lg", color: "text-green-400" },

  // 🟡 Neutral
  { word: "Long Queue", size: "text-sm", color: "text-yellow-600" },
  { word: "Average Prices", size: "text-sm", color: "text-yellow-500" },
  { word: "Limited Brands", size: "text-sm", color: "text-blue-400" },
  { word: "Okay Service", size: "text-sm", color: "text-blue-500" },
  { word: "Decent Layout", size: "text-sm", color: "text-blue-300" },
  { word: "Small Parking", size: "text-sm", color: "text-yellow-500" },

  // 🔴 Negative
  { word: "Checkout Delay", size: "text-lg", color: "text-red-400" },
  { word: "Out of Stock", size: "text-lg", color: "text-red-500" },
  { word: "Parking Issues", size: "text-sm", color: "text-red-300" },
  { word: "Limited Variety", size: "text-sm", color: "text-orange-500" },
  { word: "Unclear Signage", size: "text-sm", color: "text-yellow-700" },
  { word: "Slow Assistance", size: "text-sm", color: "text-red-600" },
  { word: "No Offers", size: "text-lg", color: "text-orange-600" },
  { word: "Unfriendly Staff", size: "text-sm", color: "text-red-500" },
  { word: "Dirty Restrooms", size: "text-sm", color: "text-red-700" },
  { word: "Damaged Products", size: "text-sm", color: "text-orange-700" },
  ];

  return (
    <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg">
  {keywords.map(({ word, size, color }, i) => (
    <span key={i} className={`${size} ${color} font-semibold`}>
      {word}
    </span>
  ))}
</div>
  );
};

export default WordCloudMock;
