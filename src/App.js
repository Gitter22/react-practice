// import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";

import AppLayout from "./components/Layout";
import ProjectList from "./pages/ProjectList";
import PCServerSidePagination from "./pages/Users/PayalC/ServerSidePagination/PCServerSidePagination"
import PCMeetingSelector from "./pages/Users/PayalC/MeetingSelector/PCMeetingSelector";

import PBClientSidePagination from "./pages/Users/PratapB/ClientSidePagination/PBClientSidePagination";
import PBMeetingSelector from "./pages/Users/PratapB/MeetingSelector/PBMeetingSelector";

import HVServerPagination from "./pages/Users/HetV/ServerSidePagination/HVServerSidePagination";
import HVMeetingSelector from "./pages/Users/HetV/MeetingSelector/HVMeetingSelector";

import SBClientSidePagination from './pages/Users/SagarB/ClientSidePagination/SBClientSidePagination'
import SBMeetingSelector from "./pages/Users/SagarB/MeetingSelector/SBMeetingSelector";

import SMClientSidePagination from './pages/Users/SagarM/ClientSidePagination/SMClientSidePagination'
import SMMeetingSelector from "./pages/Users/SagarM/MeetingSelector/SMMeetingSelector";

import Users from "./pages/Users";

// const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Users />} />

        <Route path="pratapB/client-side-pagination" element={<PBClientSidePagination />} />
        <Route path="pratapB/meeting-selector" element={<PBMeetingSelector />} />

        <Route path="payalC/server-side-pagination" element={<PCServerSidePagination />} />
        <Route path="payalC/meeting-selector" element={<PCMeetingSelector />} />

        <Route path="hetV/server-side-pagination" element={<HVServerPagination />} />
        <Route path="hetV/meeting-selector" element={<HVMeetingSelector />} />

        <Route path="sagarB/client-side-pagination" element={<SBClientSidePagination />} />
        <Route path="sagarB/meeting-selector" element={<SBMeetingSelector />} />

        <Route path="sagarM/client-side-pagination" element={<SMClientSidePagination />} />
        <Route path="sagarM/meeting-selector" element={<SMMeetingSelector />} />

        <Route path="*" element={<Users />} />
      </Route>
    </Routes>
  );
}
export default App;
