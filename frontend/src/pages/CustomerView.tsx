import { useState } from "react";
import RoomSelector from "../components/RoomSelector";
import BookingCalendar from "../components/BookingCalendar";
import BookingForm from "../components/BookingForm";
import PriceSummary from "../components/PriceSummary";
import { useQuery, gql } from "@apollo/client";

const ROOMS_QUERY = gql`
    query {
        rooms {
            id
            name
            price
        }
    }
`;

export default function CustomerView() {
    const { data, loading } = useQuery(ROOMS_QUERY);
    const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
    const [selectedDates, setSelectedDates] = useState<{ from: string; until: string } | null>(null);
    const [price, setPrice] = useState<number | null>(null);

    if (loading || !data) return <div>Loading...</div>;

    const selectedRoom = data.rooms.find((room: any) => room.id === selectedRoomId);

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
                            onSelectDates={(range) => {
                                setSelectedDates(range);
                            }}
                            selectedDates={selectedDates}
                        />
                    </div>

                    {/* Right column: Form and price */}
                    <div className="md:w-1/3 w-full space-y-4">
                        {selectedDates && selectedRoom && (
                            <>
                                <BookingForm
                                    roomId={selectedRoomId}
                                    dateRange={selectedDates}
                                    roomPrice={selectedRoom.price}
                                    onPriceCalculated={setPrice}
                                    onBookingComplete={() => {
                                        setSelectedDates(null);
                                        setPrice(null);
                                    }}
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
