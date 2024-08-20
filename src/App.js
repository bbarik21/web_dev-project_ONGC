import './App.css';
import Login from './login';
import Signup from './signup';
import CollapsibleSidebar from './Components/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AssetMaster from './Components/assetmaster';
import Software from './Components/software';
import Readings from './Components/readings';
import Attendance from './Components/attendance';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<CollapsibleSidebar />}>
          <Route index element={<CollapsibleSidebar />} />
          <Route path="asset-master" element={<AssetMaster />} />
          <Route path="software" element={<Software />} />
          <Route path="readings" element={<Readings />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
