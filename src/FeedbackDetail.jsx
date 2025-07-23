import React, { useEffect, useRef} from 'react';
import ApexCharts from 'apexcharts';
import WordCloudMock from './WordCloudMock';



function App() {
  const trendRef = useRef(null);
  const breakdownRef = useRef(null);
  const feedbackData = [
    { score: 9, text: "Great support and refund speed!", date: "Jul 18, 2025" },
    { score: 6, text: "The process was confusing and slow.", date: "Jul 16, 2025" },
    { score: 8, text: "Easy to navigate but slow response.", date: "Jul 14, 2025" },
    { score: 10, text: "Super quick and helpful team.", date: "Jul 12, 2025" },
    { score: 5, text: "Late refund and no updates.", date: "Jul 10, 2025" },
  ];
  
  const getNpsTag = (score) => {
    if (score >= 9) return 'Promoter';
    if (score >= 7) return 'Passive';
    return 'Detractor';
  };
  
  const getTagColor = (score) => {
    if (score >= 9) return 'bg-green-600';
    if (score >= 7) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  // Area chart: NPS trends
  useEffect(() => {
    const trendOptions = {
      chart: {
        type: 'area',
        height: 300,
        toolbar: { show: false },
      },
      series: [{
        name: 'NPS',
        data: [35, 60, 25, 42, 5, 14]
      }],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        title: { text: 'Month' }
      },
      yaxis: {
        min: 0,
        max: 100,
        title: { text: 'NPS Score' }
      },
      colors: ['#E34234'],
      stroke: {
        curve: 'smooth',
        width: 2
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.6,
          opacityTo: 0.1,
          stops: [0, 100]
        }
      },
      dataLabels: {
        enabled: false
      }
    };

    const chart = new ApexCharts(trendRef.current, trendOptions);
    chart.render();

    return () => chart.destroy();
  }, []);

  // Bar chart: NPS rating breakdown
  useEffect(() => {
    const scores = [1, 3, 4, 42, 6, 33, 45, 5, 5, 50, 10];

    const breakdownOptions = {
      chart: {
        type: 'bar',
        height: 300,
        toolbar: { show: false }
      },
      series: [{
        name: 'Responses (%)',
        data: scores
      }],
      xaxis: {
        categories: [...Array(11).keys()],
        title: { text: 'Ratings' }
      },
      yaxis: {
        max: 80,
        title: { text: 'Responses (%)' }
      },
      plotOptions: {
        bar: {
          distributed: true,
          columnWidth: '60%'
        }
      },
      colors: scores.map((_, i) => {
        if (i <= 6) return '#f87171';
        if (i <= 8) return '#d97706';
        return '#22c55e';
      }),
      tooltip: {
        y: {
          formatter: (val) => `${val}%`
        }
      },
      dataLabels: {
        enabled: false
      }
    };

    const chart = new ApexCharts(breakdownRef.current, breakdownOptions);
    chart.render();

    return () => chart.destroy();
  }, []);
  

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="header-area bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800">Feedback Title</h1>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Draft</span>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors">Publish</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition-colors">Edit</button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="main-content-area">
        {/* Left Panel: Campaign Info */}
        <aside className="campaign-info-area bg-white w-96 p-6 rounded-lg shadow-md h-full overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Feedback Info</h2>
          <a href="#" className="text-blue-500 text-sm mb-4 block">Design Preview</a>
          <div className="mb-6">
            <p className="text-4xl font-bold text-blue-600">0</p>
            <p className="text-gray-500 text-sm">Total Responses</p>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Feedback Description</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            To analyze the customer experince about enrolling in the loyalty program 
          </p>
          <div className="space-y-2 text-gray-700 text-sm">
            <p><strong>No of Question</strong> 2</p>
            <p><strong>Created Date</strong> 12/01/2025</p>
            <p><strong>Modified Date</strong> 12/07/2025</p>
          
          </div>
        </aside>

        {/* Right Panel: Metrics, ROI, Trends, Journey */}
        <section className="right-panel-area">
        <div className="flex gap-6">
  {/* NPS Metrics Panel (Left - 50%) */}
  <div className="w-1/2 bg-white p-6 rounded-lg shadow-md font-poppins">
    <h2 className="text-lg font-semibold text-gray-800 mb-6">NPS</h2>

    <div className="grid grid-cols-2 gap-4 text-center mb-6">
      <div>
        <p className="text-3xl font-bold text-emerald-500">40%</p>
        <p className="text-sm text-gray-500">NPS score</p>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-700">8.5</p>
        <p className="text-sm text-gray-500">NPS rating</p>
      </div>
      <div>
        <p className="text-2xl font-semibold text-gray-800">1,356</p>
        <p className="text-sm text-gray-500">Total responses</p>
      </div>
      <div>
        <p className="text-2xl font-semibold text-gray-800">1,237</p>
        <p className="text-sm text-gray-500">Total respondents</p>
      </div>
    </div>

    {/* Horizontal bar */}
    <div className="h-3 w-full flex rounded-full overflow-hidden mb-4">
      <div className="bg-emerald-400" style={{ width: '50%' }}></div>
      <div className="bg-yellow-400" style={{ width: '30%' }}></div>
      <div className="bg-rose-400" style={{ width: '20%' }}></div>
    </div>

    {/* Labels */}
    <div className="grid grid-cols-3 text-center">
      <div>
        <p className="text-sm text-gray-700 font-semibold">Promoters</p>
        <p className="text-sm text-emerald-500 font-bold">50%</p>
        <p className="text-xs text-gray-500">434 responses</p>
      </div>
      <div>
        <p className="text-sm text-gray-700 font-semibold">Passives</p>
        <p className="text-sm text-yellow-500 font-bold">30%</p>
        <p className="text-xs text-gray-500">256 responses</p>
      </div>
      <div>
        <p className="text-sm text-gray-700 font-semibold">Detractors</p>
        <p className="text-sm text-rose-500 font-bold">20%</p>
        <p className="text-xs text-gray-500">158 responses</p>
      </div>
    </div>
  </div>

  {/* Chart Panel (Right - 50%) */}
  <div className="w-1/2 bg-white p-6 rounded-lg shadow-md font-poppins">
    <h2 className="text-lg font-semibold text-gray-800 mb-6">NPS Trends</h2>
    <div ref={trendRef} className="h-[300px]"></div>
    </div>
</div>


          {/* Middle row in right panel: Campaign Trends */}
          <div className="campaign-trends-area bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-700 mb-4">Rating Breakdown</h2>
  <div className=" rounded-lg p-4">
    <div ref={breakdownRef} className="w-full h-[350px]" />
  </div>
</div>
<div className="campaign-journey-area bg-white p-6 rounded-lg shadow-md space-y-8">
      
      {/* Word Cloud Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Feedback Keywords</h2>
        <div className=" p-4 rounded-lg">
          <WordCloudMock />
        </div>
      </div>

      {/* Feedback List Section */}
     
    </div>
    <div className='bg-white p-6 rounded-lg shadow-md'>
        {/* Header & Sort */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Customer Comments</h2>
          <select className="text-sm border border-gray-300 rounded-md px-3 py-1 text-gray-700 focus:outline-none">
            <option>Latest</option>
            <option>Oldest</option>
            <option>Highest Rating</option>
            <option>Promoters</option>
            <option>Detractors</option>
          </select>
        </div>

        {/* Comment List */}
        <div className="divide-y divide-gray-100 border border-gray-200 p-4 rounded-lg">
          {feedbackData.map((item, index) => {
            const tag = getNpsTag(item.score);
            const tagColor = getTagColor(item.score);
            return (
              <div key={index} className="py-4 ">
                <div className="flex items-start gap-3 bor">
                  <div className={`w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center mt-1 ${tagColor}`}>
                    {item.score}
                  </div>
                  <div className="flex-1">
                    <div className={`inline-block text-xs font-medium text-white px-2 py-1 rounded-full mb-1 ${tagColor}`}>
                      {tag}
                    </div>
                    <p className="text-sm text-gray-700">{item.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center items-center space-x-2 text-gray-500 text-sm">
          <button className="p-1 hover:text-gray-800">&laquo;</button>
          <button className="p-1 hover:text-gray-800">&lsaquo;</button>
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                num === 1 ? 'bg-gray-800 text-white' : 'hover:bg-gray-200'
              }`}
            >
              {num}
            </button>
          ))}
          <span>...</span>
          <button className="p-1 hover:text-gray-800">&rsaquo;</button>
          <button className="p-1 hover:text-gray-800">&raquo;</button>
        </div>
      </div>

        </section>
      </div>
    </div>
  );
  
}

export default App;
