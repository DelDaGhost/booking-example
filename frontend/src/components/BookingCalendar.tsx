import { gql, useQuery } from "@apollo/client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const BOOKINGS_QUERY = gql`
    query GetBookings($roomId: Int!) {
        bookings(roomId: $roomId) {
            id
            from
            until
        }
    }
`;

export default function BookingCalendar({
                                            roomId,
                                            onSelectDates,
                                            selectedDates,
                                            additionalBookings = [],
                                        }: {
    roomId: number;
    onSelectDates: (range: { from: string; until: string }) => void;
    selectedDates: { from: string; until: string } | null;
    additionalBookings?: { id: number; from: string; until: string }[];
}) {
    const { data, loading, error } = useQuery(BOOKINGS_QUERY, {
        variables: { roomId },
    });

    if (loading) return <div>Loading calendar...</div>;
    if (error) return <div>Error loading bookings.</div>;

    const fetchedBookings = data?.bookings || [];
    const allBookings = [...fetchedBookings, ...additionalBookings];

    const events = allBookings.map((b: any) => ({
        title: "Booked",
        start: b.from,
        end: new Date(new Date(b.until).getTime() + 86400000)
            .toISOString()
            .slice(0, 10),
        allDay: true,
        // Changed booked events color to a strong red (#dc2626)
        color: "#dc2626",
    }));

    // Render the selected date range (unchanged)
    if (selectedDates) {
        events.push({
            title: "Selected",
            start: selectedDates.from,
            end: selectedDates.until,
            allDay: true,
            color: "#93c5fd", // blue, remains the same
        });
    }

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            firstDay={1} // Start on Monday
            selectable={true}
            select={(info) =>
                onSelectDates({
                    from: info.startStr,
                    until: info.endStr,
                })
            }
            events={events}
            selectMirror={true}
            dayMaxEvents={true}
            height="auto"
        />
    );
}
