import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllNotifications from "./pages/AllNotifications";
import PriorityInbox from "./pages/PriorityInbox";
import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllNotifications />} />
        <Route path="/priority" element={<PriorityInbox />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;