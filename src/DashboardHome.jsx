import React, {useState} from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Activity, 
  Users, 
  MessageSquare, 
  TrendingUp,
  Award,
  Clock,
  Target,
  Calendar,
  BarChart3,
  Zap,
  Eye
} from 'lucide-react';

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('Responses');
  // Sample data
  const kpiData = {
    totalModules: 24,
    totalEvents: 15420,
    totalResponses: 9856,
    avgCompletionRate: 64.2
  };
  
  const completionRateData = [
    { module: 'After Purchase (Invoice Generated)', rate: 78.5 },
    { module: 'After Rewards Redeemed', rate: 45.2 },
    { module: 'After Campaign Participation', rate: 62.8 },
    { module: 'After Return/Refund Completed', rate: 71.3 },
    { module: 'After Loyalty Enrollment', rate: 12.3 },
    { module: 'After Earning Points', rate: 51.3 },
    { module: 'After Redeeming Points', rate: 40.3 },
    { module: 'After Rewards Earned', rate: 70 },

  ];

  const categoryData = [
    { name: 'Ease of Use. (CES)', value: 35, color: '#6366f1' },
    { name: 'Loyalty (NPS)', value: 25, color: '#14b8a6' },
    { name: 'Satisfaction (CSAT)', value: 20, color: '#8b5cf6' },
    { name: 'Other', value: 5, color: '#64748b' }
  ];

  const radarData = [
    { category: 'Ease of Use. (CES)', rate: 72 },
    { category: 'Loyalty (NPS)', rate: 68 },
    { category: 'Satisfaction CSAT', rate: 58 },
    { category: 'Other', rate: 52 }
  ];

  const trendData = [
    {
      month: 'Jan',
      events: {
        'After Purchase (Invoice Generated)': { triggered: 300, responses: 250 },
        'After Rewards Redeem': { triggered: 120, responses: 90 },
        'After Campaign Participation': { triggered: 100, responses: 80 },
        'After Return/Refund': { triggered: 150, responses: 130 },
        'After Loyalty Enrollment': { triggered: 110, responses: 85 },
        'After Earning Points': { triggered: 160, responses: 140 },
        'After Redeeming Points': { triggered: 140, responses: 120 },
        'After Rewards Earned': { triggered: 120, responses: 110 },
      },
    },
    {
      month: 'Feb',
      events: {
        'After Purchase (Invoice Generated)': { triggered: 320, responses: 260 },
        'After Rewards Redeem': { triggered: 130, responses: 95 },
        'After Campaign Participation': { triggered: 110, responses: 85 },
        'After Return/Refund': { triggered: 160, responses: 135 },
        'After Loyalty Enrollment': { triggered: 115, responses: 90 },
        'After Earning Points': { triggered: 170, responses: 145 },
        'After Redeeming Points': { triggered: 150, responses: 125 },
        'After Rewards Earned': { triggered: 130, responses: 115 },
      },
    },
    {
      month: 'Mar',
      events: {
        'After Purchase (Invoice Generated)': { triggered: 290, responses: 230 },
        'After Rewards Redeem': { triggered: 125, responses: 90 },
        'After Campaign Participation': { triggered: 95, responses: 75 },
        'After Return/Refund': { triggered: 140, responses: 120 },
        'After Loyalty Enrollment': { triggered: 105, responses: 80 },
        'After Earning Points': { triggered: 155, responses: 135 },
        'After Redeeming Points': { triggered: 135, responses: 115 },
        'After Rewards Earned': { triggered: 125, responses: 105 },
      },
    },
    {
      month: 'Apr',
      events: {
        'After Purchase (Invoice Generated)': { triggered: 350, responses: 280 },
        'After Rewards Redeem': { triggered: 140, responses: 105 },
        'After Campaign Participation': { triggered: 120, responses: 95 },
        'After Return/Refund': { triggered: 170, responses: 140 },
        'After Loyalty Enrollment': { triggered: 125, responses: 95 },
        'After Earning Points': { triggered: 180, responses: 150 },
        'After Redeeming Points': { triggered: 160, responses: 135 },
        'After Rewards Earned': { triggered: 140, responses: 120 },
      },
    },
    
  ];
  const flattenedTrendData = [];

trendData.forEach(({ month, events }) => {
  Object.entries(events).forEach(([eventType, { triggered, responses }]) => {
    flattenedTrendData.push({
      month,
      eventType,
      triggered,
      responses,
    });
  });
});
const eventTypes = Object.keys(trendData[0].events);

const chartData = trendData.map(({ month, events }) => {
  const base = { month };
  eventTypes.forEach((eventType) => {
    base[`${eventType} (Triggered)`] = events[eventType].triggered;
    base[`${eventType} (Responses)`] = events[eventType].responses;
  });
  return base;
}); 
  const topPerformingData = [
    { 
      title: 'Highest Response Rate', 
      value: '85.2%', 
      subtitle: 'Post-Purchase Experience Survey', 
      icon: Award,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50'
    },
    { 
      title: 'Fastest Completion', 
      value: '2.3 min', 
      subtitle: 'Loyalty Program Satisfaction', 
      icon: Clock,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    { 
      title: 'Most Triggered Event', 
      value: '3,420', 
      subtitle: 'Event Type - Purchase Completion', 
      icon: Zap,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50 to-violet-50'
    }
  ];

  const tableData = [
    {
      title: 'Post-Purchase Experience Survey',
      eventType: 'Purchase',
      category: 'Customer Experience',
      createdDate: '2024-01-15',
      questions: 5,
      triggered: 1420,
      responses: 1108,
      completionRate: 78.0
    },
    {
      title: 'Return Process Feedback',
      eventType: 'Return',
      category: 'Refunds/Returns',
      createdDate: '2024-01-10',
      questions: 3,
      triggered: 245,
      responses: 110,
      completionRate: 44.9
    },
    {
      title: 'Loyalty Program Satisfaction',
      eventType: 'Loyalty',
      category: 'Loyalty',
      createdDate: '2024-01-20',
      questions: 7,
      triggered: 890,
      responses: 635,
      completionRate: 71.3
    },
    {
      title: 'Feedback Campaign',
      eventType: 'Campaign',
      category: 'Campaigns',
      createdDate: '2024-01-25',
      questions: 4,
      triggered: 2100,
      responses: 1320,
      completionRate: 62.9
    },
    {
      title: 'Product Quality Assessment',
      eventType: 'Purchase',
      category: 'Customer Experience',
      createdDate: '2024-02-01',
      questions: 6,
      triggered: 780,
      responses: 520,
      completionRate: 66.7
    }
  ];

  const KPICard = ({ title, value, icon: Icon, trend, color = "from-indigo-500 to-indigo-600" }) => (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/60 hover:border-slate-300/60 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 bg-gradient-to-br ${color} rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900">{value}</p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          {trend && (
            <p className="text-sm text-emerald-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const ChartCard = ({ title, children, className = "", icon: Icon }) => (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div className="px-6 py-5 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="p-2 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg">
              <Icon className="h-5 w-5 text-slate-600" />
            </div>
          )}
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );

  const getCompletionColor = (rate) => {
    if (rate >= 70) return 'bg-emerald-500';
    if (rate >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };
  const indigoShades = [
    '#6366F1', // base indigo (500)
    '#4F46E5', // slightly darker (600)
    '#818CF8', // slightly lighter (400)
    '#A5B4FC', // pastel indigo (300)
    '#4338CA', // deep indigo (700)
    '#E0E7FF', // very light indigo (100)
    '#C7D2FE', // light tint (200)
  ];
  const getEventTypeBadge = (eventType) => {
    const styles = {
      'Purchase': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Return': 'bg-orange-100 text-orange-800 border-orange-200',
      'Campaign': 'bg-purple-100 text-purple-800 border-purple-200',
      'Loyalty': 'bg-teal-100 text-teal-800 border-teal-200'
    };
    return styles[eventType] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-4 lg:p-8">
      <div className="max-w-full mx-auto space-y-8">
        {/* Header */}
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Feedback Analytics
              </h1>
              <p className="text-slate-600 mt-1">Real-time insights into customer feedback performance</p>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <KPICard
            title="Total Feedback Modules"
            value={kpiData.totalModules}
            icon={MessageSquare}
            color="from-indigo-500 to-purple-600"
          />
          <KPICard
            title="Events Triggered"
            value={kpiData.totalEvents.toLocaleString()}
            icon={Activity}
            color="from-emerald-500 to-teal-600"
          />
          <KPICard
            title="Responses Received"
            value={kpiData.totalResponses.toLocaleString()}
            icon={Users}
            color="from-blue-500 to-indigo-600" 
          />
          <KPICard
            title="Avg Completion Rate"
            value={`${kpiData.avgCompletionRate}%`}
            icon={Target}
            color="from-amber-500 to-orange-600"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Bar Chart */}
          <ChartCard title="Completion Rate by Event" icon={BarChart3}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={completionRateData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="module" 
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Completion Rate']}
                  labelStyle={{ color: '#374151', fontWeight: '600' }}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="rate" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Pie Chart */}
          <ChartCard title="Feedback Distribution by Category (Count of Feedback Created for Each Category)" icon={Eye}>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="#ffffff"
                  strokeWidth={2}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Distribution']}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => (
                    <span style={{ color: '#64748b', fontSize: '12px' }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Radar Chart */}
          <ChartCard title="Feedback Performance by category - Completion Rate" icon={Target}>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 12, fill: '#64748b' }} />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Radar
                  name="Completion Rate"
                  dataKey="rate"
                  stroke="#14b8a6"
                  fill="#14b8a6"
                  fillOpacity={0.15}
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#14b8a6' }}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Completion Rate']}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Line Chart */}
          <ChartCard title="Feedback Trends" icon={TrendingUp}>
      {/* Toggle Button */}
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md shadow-sm">
          {['Triggered', 'Responses'].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-1 text-sm font-medium border border-gray-300 ${
                viewMode === mode
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700'
              } first:rounded-l-md last:rounded-r-md`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => (
              <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '500' }}>
                {value}
              </span>
            )}
          />

          {/* Conditionally render stacked bars based on mode */}
          {eventTypes.map((event, index) => (
            <Bar
              key={`${event}-${viewMode.toLowerCase()}`}
              dataKey={`${event} (${viewMode})`}
              stackId="a"
              fill={indigoShades[index % indigoShades.length]}
              name={`${event} - ${viewMode}`}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>

        </div>

        {/* Top Performing Events */}
        <ChartCard title="Top Performing Metrics" icon={Award}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPerformingData.map((item, index) => (
              <div key={index} className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${item.bgColor} border border-white/60 p-6 hover:scale-105 transition-transform duration-300`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${item.color} rounded-xl shadow-lg`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">{item.title}</p>
                  <p className="text-3xl font-bold text-slate-900">{item.value}</p>
                  <p className="text-sm text-slate-500">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Feedback Summary Table */}
        <ChartCard title="Feedback Summary" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-900">Feedback Title</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-900">Event Type</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-900">Category</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-900">Created</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-slate-900">Questions</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-slate-900">Triggered</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-slate-900">Responses</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-slate-900">Completion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors duration-200">
                    <td className="py-4 px-4">
                      <div className="font-medium text-slate-900">{row.title}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getEventTypeBadge(row.eventType)}`}>
                        {row.eventType}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600">{row.category}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-sm text-slate-600">
                        <Calendar className="h-4 w-4 text-slate-400 mr-2" />
                        {row.createdDate}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-sm font-medium text-slate-900">{row.questions}</td>
                    <td className="py-4 px-4 text-right text-sm font-medium text-slate-900">{row.triggered.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right text-sm font-medium text-slate-900">{row.responses.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-3">
                        <div className="flex-1 max-w-24">
                          <div className="bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getCompletionColor(row.completionRate)}`}
                              style={{ width: `${row.completionRate}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-slate-900 min-w-12 text-right">
                          {row.completionRate}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default Dashboard;