import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ManagerView from "./pages/ManagerView";
import CustomerView from "./pages/CustomerView";

export default function App() {
    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-4">
                    <Routes>
                        <Route path="/" element={<ManagerView />} />
                        <Route path="/customer" element={<CustomerView />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
