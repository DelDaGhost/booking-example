import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="w-60 h-screen bg-gray-800 text-white flex flex-col p-4">
            <h2 className="text-xl font-bold mb-4">Hotel Booking</h2>
            <nav className="space-y-2">
                <Link to="/" className="block p-2 rounded hover:bg-gray-700">
                    Manager View
                </Link>
                <Link to="/customer" className="block p-2 rounded hover:bg-gray-700">
                    Customer View
                </Link>
            </nav>
        </div>
    );
}
