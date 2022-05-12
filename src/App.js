import { Layout, } from 'antd';
import { Routes, Route, } from "react-router-dom";

import AppLayout from './components/Layout'
import ProjectList from './pages/ProjectList';
import ServerSidePagination from './pages/Pagination/ServerSidePagination';
import ClientSidePagination from './pages/Pagination/ClientSidePagination';
import ServerPagination from './pages/Pagination/ServerPagination'

const { Header, Footer, Content } = Layout;

function App() {
  return <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<ProjectList />} />
      <Route path="server-side-pagination" element={<ServerSidePagination />} />
      <Route path="client-side-pagination" element={<ClientSidePagination />} />
      <Route path="server-pagination" element={<ServerPagination />} />

      <Route path="*" element={<div> Hello </div>} />
    </Route>
  </Routes >
}
export default App;
