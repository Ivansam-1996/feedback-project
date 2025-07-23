import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FeedbackHeader from './FeedbackHeader.jsx'
import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import FormBuilderOptions from './FormBuilderOptions.jsx';
import DashboardHome from './DashboardHome'; 
import GetStarted from './GetStarted';
import ViewFeedback from './ViewFeedback';
import TypeformBuilder from './TypeformBuilder';
import ProgressSteps from './ProgressSteps';
import FeedbackDetail from './FeedbackDetail';
import ConfigurePageIn from './ConfigurePageIn';
import CommunicationPage from './CommunicationPage';

const BuilderLayout = () => (
  <>
    <ProgressSteps />
    <Outlet />
  </>
);
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
  <Route path="/" element={<FeedbackHeader />}>
    <Route index element={<DashboardHome />} /> {/* default route */}
    <Route path="form-builder" element={<FormBuilderOptions />} />
    <Route path="get-started" element={<GetStarted />} /> {/* new route */}
    <Route path="view-feedback" element={<ViewFeedback />} />
    <Route path="feedback" element={<FeedbackDetail />} />

    <Route path="/" element={<FormBuilderOptions />} />
        <Route path="/builder" element={<BuilderLayout />}>
          <Route index element={<TypeformBuilder />} />
        </Route>
        <Route path="/configure" element={<BuilderLayout />}>
          <Route index element={<ConfigurePageIn />} />
        </Route>
        <Route path="/communication" element={<BuilderLayout />}>
          <Route index element={<CommunicationPage/>} />
        </Route>
  </Route>
 
</Routes>
    </>
  )
}

export default App
