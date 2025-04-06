import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import RoomSelector from "../components/RoomSelector";
import BookingCalendar from "../components/BookingCalendar";
import BookingForm from "../components/BookingForm";
import PriceSummary from "../components/PriceSummary";

const ROOMS_QUERY = gql`
    query {
        rooms {
            id
            name
            price
        }
    }
`;

type Booking = {
    id: number;
    from: string;
    until: string;
};

export default function CustomerView() {
    const { data, loading, error } = useQuery(ROOMS_QUERY);
    const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
    const [selectedDates, setSelectedDates] = useState<{ from: string; until: string } | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);

    if (loading || error || !data || !data.rooms) return <div>Loading...</div>;

    const handleNewBooking = (newBooking: Booking) => {
        setBookings((prev) => [...prev, newBooking]);
        setSelectedDates(null); // Optionally clear the selection after booking
    };

    return (
        <div className="p-4 max-w-6xl mx-auto space-y-6">
            <h1 className="text-2xl font-semibold">🛏️ Book Your Stay</h1>

            <RoomSelector onSelect={setSelectedRoomId} roomsData={data.rooms} />

            {selectedRoomId && (
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left column: Calendar */}
                    <div className="md:w-2/3 w-full">
                        <BookingCalendar
                            roomId={selectedRoomId}
                            selectedDates={selectedDates}
                            onSelectDates={setSelectedDates}
                            additionalBookings={bookings}
                        />
                    </div>

                    {/* Right column: Form and price */}
                    <div className="md:w-1/3 w-full space-y-4">
                        {selectedDates && (
                            <>
                                <BookingForm
                                    roomId={selectedRoomId}
                                    roomPrice={
                                        data.rooms.find((r: any) => r.id === selectedRoomId).price
                                    }
                                    dateRange={selectedDates}
                                    onBookingComplete={handleNewBooking}
                                    onPriceCalculated={setPrice}
                                />
                                {price !== null && <PriceSummary price={price} />}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
