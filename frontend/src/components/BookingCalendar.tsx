import { useQuery, gql } from "@apollo/client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { format, subDays } from "date-fns";

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
                                        }: {
    roomId: number;
    onSelectDates: (range: { from: string; until: string }) => void;
}) {
    const { data, loading, error } = useQuery(BOOKINGS_QUERY, {
        variables: { roomId },
    });

    if (loading) return <div>Loading calendar...</div>;
    if (error) return <div>Error loading bookings.</div>;

    const events = data.bookings.map((b: any) => ({
        title: "Booked",
        start: b.from,
        end: new Date(new Date(b.until).getTime() + 86400000).toISOString().slice(0, 10), // inclusive
        display: "background",
        color: "#f87171",
    }));

    return (
        <div>
            <label className="block mb-1 font-medium">Choose your dates</label>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                firstDay={1}
                selectable={true}
                select={(info) => {
                    const startStr = format(info.start, "yyyy-MM-dd");
                    const untilStr = format(subDays(info.end, 1), "yyyy-MM-dd");
                    onSelectDates({
                        from: startStr,
                        until: untilStr,
                    });
                }}
                events={events}
                height="auto"
            />
        </div>
    );
}
