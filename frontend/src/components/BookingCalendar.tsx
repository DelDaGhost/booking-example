// BookingCalendar.tsx
import { useQuery, gql } from "@apollo/client";
import FullCalendar from "@fullcalendar/react";
import { DateSelectArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const BOOKINGS_QUERY = gql`
    query GetBookings($roomId: Int!) {
        bookings(roomId: $roomId) {
            from
            until
        }
    }
`;

export default function BookingCalendar({
                                            roomId,
                                            onSelectDates,
                                            selectedDates,
                                        }: {
    roomId: number;
    onSelectDates: (range: { from: string; until: string }) => void;
    selectedDates: { from: string; until: string } | null;
}) {
    const { data, loading, error } = useQuery(BOOKINGS_QUERY, {
        variables: { roomId },
    });

    if (loading) return <div>Loading calendar...</div>;
    if (error) return <div>Error loading bookings.</div>;

    const events = [
        ...data.bookings.map((b: any) => ({
            title: "Booked",
            start: b.from,
            end: new Date(new Date(b.until).getTime() + 86400000)
                .toISOString()
                .slice(0, 10),
            display: "background",
            color: "#f87171",
        })),
        ...(selectedDates
            ? [
                {
                    title: "Selected",
                    start: selectedDates.from,
                    end: selectedDates.until, // still exclusive
                    display: "background",
                    color: "#93c5fd",
                },
            ]
            : []),
    ];

    return (
        <div>
            <label className="block mb-1 font-medium">Choose your dates</label>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                firstDay={1}
                selectable={true}
                select={(info: DateSelectArg) => {
                    onSelectDates({
                        from: info.startStr,
                        until: info.endStr, // store exclusive
                    });
                }}
                events={events}
                height="auto"
            />
        </div>
    );
}
