import { useState } from "react";
import RoomSelector from "../components/RoomSelector";
import BookingCalendar from "../components/BookingCalendar";
import BookingForm from "../components/BookingForm";
import PriceSummary from "../components/PriceSummary";

export default function CustomerView() {
    const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
    const [selectedDates, setSelectedDates] = useState<{ from: string; until: string } | null>(null);
    const [price, setPrice] = useState<number | null>(null);

    return (
        <div className="p-4 max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-semibold">🛏️ Book Your Stay</h1>

            <RoomSelector onSelect={setSelectedRoomId} />

            {selectedRoomId && (
                <BookingCalendar
                    roomId={selectedRoomId}
                    onSelectDates={(range) => {
                        setSelectedDates(range);
                    }}
                />
            )}

            {selectedRoomId && selectedDates && (
                <BookingForm
                    roomId={selectedRoomId}
                    dateRange={selectedDates}
                    onPriceCalculated={setPrice}
                />
            )}

            {price !== null && <PriceSummary price={price} />}
        </div>
    );
}
