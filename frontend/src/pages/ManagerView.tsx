import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { format, parseISO, addDays } from "date-fns";

const GET_ROOMS = gql`
    query {
        rooms {
            id
            name
        }
    }
`;

const GET_BOOKINGS = gql`
    query GetBookings($roomId: Int!) {
        bookings(roomId: $roomId) {
            id
            firstname
            lastname
            email
            from
            until
        }
    }
`;

export default function ManagerView() {
    const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
    const [selectedBooking, setSelectedBooking] = useState<any>(null);

    const { data: roomsData, loading: loadingRooms } = useQuery(GET_ROOMS);
    const { data: bookingsData, loading: loadingBookings, refetch } = useQuery(GET_BOOKINGS, {
        variables: { roomId: selectedRoom },
        skip: selectedRoom === null,
    });

    useEffect(() => {
        if (selectedRoom !== null) {
            refetch({ roomId: selectedRoom });
        }
    }, [selectedRoom]);

    const events =
        bookingsData?.bookings.map((b: any) => ({
            id: b.id.toString(),
            title: `${b.firstname} ${b.lastname}`,
            start: b.from,
            end: format(addDays(parseISO(b.until), 1), "yyyy-MM-dd"),
            allDay: true,
        })) || [];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manager View</h1>

            {loadingRooms ? (
                <p>Loading rooms...</p>
            ) : (
                <select
                    className="mb-4 border px-3 py-2 rounded"
                    value={selectedRoom ?? ""}
                    onChange={(e) => setSelectedRoom(Number(e.target.value))}
                >
                    <option value="" disabled>Select a room</option>
                    {roomsData.rooms.map((room: any) => (
                        <option key={room.id} value={room.id}>
                            {room.name}
                        </option>
                    ))}
                </select>
            )}

            {loadingBookings ? (
                <p>Loading bookings...</p>
            ) : (
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    firstDay={1}
                    events={events}
                    height="auto"
                    eventClick={(info) => {
                        const booking = bookingsData.bookings.find(
                            (b: any) => b.id.toString() === info.event.id
                        );
                        setSelectedBooking(booking);
                    }}
                />
            )}

            {selectedBooking && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl relative w-full max-w-md">
                        <button
                            onClick={() => setSelectedBooking(null)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-black"
                        >
                            ✕
                        </button>
                        <h2 className="text-lg font-semibold mb-2">Booking Details</h2>
                        <p><strong>Name:</strong> {selectedBooking.firstname} {selectedBooking.lastname}</p>
                        <p><strong>Email:</strong> {selectedBooking.email}</p>
                        <p><strong>From:</strong> {format(parseISO(selectedBooking.from), "yyyy-MM-dd")}</p>
                        <p><strong>Until:</strong> {format(parseISO(selectedBooking.until), "yyyy-MM-dd")}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
