import React, { useState } from 'react';
import { FaMobileAlt,FaCircle } from 'react-icons/fa';

const CommunicationPage = () => {
    const [selectedRecipients, setSelectedRecipients] = useState([]);

    const toggleRecipient = (id) => {
      setSelectedRecipients((prev) =>
        prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
      );
    };
    
    const users = [
      { id: 1, name: 'Alice Sharma' },
      { id: 2, name: 'Rahul Nair' },
      { id: 3, name: 'Neha Verma' },
    ];
  const [triggerType, setTriggerType] = useState('immediate');
  const [delayTime, setDelayTime] = useState('');

  const [channels, setChannels] = useState({
    whatsapp: true,
    sms: true,
    email: true,
  });

  const [negativeAlert, setNegativeAlert] = useState({
    whatsapp: true,
    sms: true,
  });

  const [fallbackSMS, setFallbackSMS] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');

  return (
    <div className="flex h-screen font-poppins">
      {/* LEFT PANEL */}
      <aside className="w-2/5 pr-6 overflow-y-auto p-6 space-y-6">
        {/* Feedback Trigger */}
        <div className="space-y-4 border border-gray-300 rounded-lg p-5 shadow-md">
  <h3 className="text-blue-800 font-semibold text-lg">Feedback Trigger</h3>


  {/* Event Trigger Dropdown */}
  <div className="space-y-2">
    <label className="block text-sm text-gray-600 mb-1">Trigger Event</label>
    <select
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
      value={selectedEvent}
      onChange={(e) => setSelectedEvent(e.target.value)}
    >
      <option value="">Select an event...</option>
      <option value="invoice_generated">After Purchase (Invoice Generated)</option>
      <option value="loyalty_enrolled">After Loyalty Enrollment</option>
      <option value="points_earned">After Earning Points</option>
      <option value="points_redeemed">After Redeeming Points</option>
      <option value="rewards_earned">After Rewards Earned</option>
      <option value="rewards_redeemed">After Rewards Redeemed</option>
      <option value="campaign_participated">After Campaign Participation</option>
      <option value="return_refund_done">After Return/Refund Completed</option>
    </select>
  </div>

  {/* Timing Selection */}
  <div className="space-y-2">
    <label className="block text-sm text-gray-600 mb-1">Timing</label>

    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="trigger"
        value="immediate"
        checked={triggerType === 'immediate'}
        onChange={() => setTriggerType('immediate')}
      />
      <span>Send Immediately</span>
    </label>

    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="trigger"
        value="delayed"
        checked={triggerType === 'delayed'}
        onChange={() => setTriggerType('delayed')}
      />
      <span>Send after a delay</span>
    </label>

    {triggerType === 'delayed' && (
      <input
        type="text"
        placeholder="e.g. 30 mins or 1 hour"
        value={delayTime}
        onChange={(e) => setDelayTime(e.target.value)}
        className="mt-1 border border-gray-300 px-3 py-2 rounded w-1/2 text-sm"
      />
    )}
  </div>
</div>


        {/* Channels */}
        <div className="space-y-4 border border-gray-300 rounded-lg p-5 shadow-md">
          <h3 className="text-blue-800 font-semibold text-lg">Channels</h3>

          {/* WhatsApp */}
          <div className=" border border-gray-300 p-4 rounded space-y-2">
  <label className="flex items-center gap-2 font-medium text-gray-700">
    <input
      type="radio"
      checked={channels.whatsapp}
      onChange={() => setChannels(prev => ({ ...prev, whatsapp: !prev.whatsapp }))}
    />
    WhatsApp
  </label>

  <label className="flex items-center justify-between text-sm text-gray-600">
    <span>Send via SMS when WhatsApp Fails</span>
    <input
      type="radio"
      checked={fallbackSMS}
      onChange={() => setFallbackSMS(!fallbackSMS)}
      className="accent-indigo-600"
    />
  </label>

  <select className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-700">
    <option>Feedback Request - Post Purchase</option>
    <option>Customer Service Satisfaction</option>
    <option>In-Store Experience Check-in</option>
    <option>Return/Refund Follow-up</option>
  </select>
</div>

          {/* SMS */}
          <div className=" border border-gray-300 p-4 rounded space-y-2">
  <label className="flex items-center gap-2 font-medium text-gray-700">
    <input
      type="radio"
      checked={channels.sms}
      onChange={() => setChannels(prev => ({ ...prev, sms: !prev.sms }))}
    />
    SMS
  </label>

  <select className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-700">
    <option>Rate Your Purchase Experience</option>
    <option>Loyalty Signup Feedback</option>
    <option>Quick Service Feedback</option>
    <option>Promo Visit Follow-up</option>
  </select>
</div>

          {/* Email */}
         
        </div>

        {/* Negative Feedback Alert */}
        <div className="space-y-4 border border-blue-300 rounded-lg p-5 shadow-md">
          <h3 className="text-blue-800 font-semibold text-lg">Negative Feedback Alert</h3>

          <div className="space-y-3">
            <label className="flex items-center gap-2 font-medium text-gray-700">
              <input
                type="checkbox"
                checked={negativeAlert.whatsapp}
                onChange={() => setNegativeAlert(prev => ({ ...prev, whatsapp: !prev.whatsapp }))}
              />
              WhatsApp
            </label>
            <label className="flex items-center gap-2 font-medium text-gray-700">
              <input
                type="checkbox"
                checked={negativeAlert.sms}
                onChange={() => setNegativeAlert(prev => ({ ...prev, sms: !prev.sms }))}
              />
              SMS
            </label>

            <div className="text-sm text-gray-600 mt-4">
            <label className="font-semibold block mb-2">Recipients:</label>
            <div className="border border-gray-300 rounded-md p-3  max-h-40 overflow-y-auto space-y-2">
                {users.map((user, index) => (
                <label key={user.id || index} className="flex items-center gap-2">
                    <input
                    type="checkbox"
                    checked={selectedRecipients.includes(user.id)}
                    onChange={() => toggleRecipient(user.id)}
                    className="accent-indigo-600"
                    />
                    <span>{user.name || user.email}</span>
                </label>
                ))}
            </div>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT PANEL: Mobile Preview */}
      <main className="w-3/5 flex justify-center items-center bg-gradient-to-br from-indigo-100 to-white rounded-lg shadow">
      <div className="relative h-[650px] w-[340px] ring-8 ring-indigo-200 rounded-3xl bg-white shadow-2xl overflow-hidden">
  {/* Top notch */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-6 rounded-b-xl bg-black z-10"></div>
  {/* Bottom bar */}
  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[40%] h-1 rounded-full bg-black z-10"></div>

  {/* WhatsApp green header */}
  <div className="bg-[#075e54] text-white px-4 h-12 py-2 flex items-center justify-between">
  {/* Left section: profile + name */}
  <div className="flex items-center gap-2">
    <FaCircle className="text-gray-300 text-lg" />
    <span className="font-semibold text-sm">Mia</span>
  </div>

  {/* Right section: icons */}
  <div className="flex space-x-3 text-white text-sm">
    <i className="fas fa-video" />
    <i className="fas fa-phone" />
    <i className="fas fa-ellipsis-v" />
  </div>
</div>

  {/* Chat area */}
  <div className="flex flex-col gap-3 px-4 py-3 bg-[#e5ddd5] h-[calc(100%-112px)] overflow-y-auto text-sm">
    {/* Outbound feedback message */}
    <div className="self-start max-w-[85%] bg-white px-4 py-3 rounded-xl shadow text-gray-900">
      Hey Sam, you have recently purchased a shoe. Kindly give your feedback.
      <div className="flex justify-start mt-3">
        <button className="bg-[#e4f1ff] text-blue-700 px-4 py-1.5 rounded-md text-xs font-semibold shadow hover:bg-blue-100 transition">
          Give Feedback
        </button>
      </div>
      <div className="text-xs text-right text-gray-400 mt-2">10:45 AM</div>
    </div>
  </div>

  {/* Bottom input bar */}
  <div className="bg-white border-t px-2 py-2 flex items-center justify-between text-gray-500">
    <i className="far fa-smile text-xl mx-1"></i>
    <input
      type="text"
      placeholder="Type a message"
      className="flex-1 mx-2 px-3 py-1 rounded-full bg-gray-100 text-sm outline-none"
    />
    <i className="fas fa-camera text-lg mx-1"></i>
    <i className="fas fa-microphone text-lg mx-1"></i>
  </div>
</div>


      </main>
    </div>
  );
};

export default CommunicationPage;
