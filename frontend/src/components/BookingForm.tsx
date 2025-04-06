import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

const BOOK_ROOM = gql`
    mutation BookRoom($input: BookRoomInput!) {
        bookRoom(input: $input) {
            id
            from
            until
        }
    }
`;

export default function BookingForm({
                                        roomId,
                                        dateRange,
                                        roomPrice,
                                        onBookingComplete,
                                        onPriceCalculated,
                                    }: {
    roomId: number;
    dateRange: { from: string; until: string };
    roomPrice: number;
    onBookingComplete: (booking: { id: number; from: string; until: string }) => void;
    onPriceCalculated: (price: number) => void;
}) {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");

    const [bookRoom, { loading, error }] = useMutation(BOOK_ROOM, {
        onCompleted: (data) => {
            setFirstname("");
            setLastname("");
            setEmail("");
            onBookingComplete(data.bookRoom);
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Adjust the end date to be inclusive (subtract 1 day from exclusive FullCalendar end)
        const adjustedUntil = new Date(
            new Date(dateRange.until).getTime() - 86400000
        )
            .toISOString()
            .slice(0, 10);

        await bookRoom({
            variables: {
                input: {
                    roomId,
                    from: dateRange.from,
                    until: adjustedUntil,
                    firstname,
                    lastname,
                    email,
                },
            },
        });
    };

    const numberOfNights =
        Math.ceil(
            (new Date(dateRange.until).getTime() - new Date(dateRange.from).getTime()) /
            (1000 * 60 * 60 * 24)
        ) || 0;
    const totalPrice = numberOfNights * roomPrice;

    useEffect(() => {
        onPriceCalculated(totalPrice);
    }, [totalPrice, onPriceCalculated]);

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 p-4 border rounded-lg shadow-sm bg-white"
        >
            <h2 className="text-lg font-semibold">Book this room</h2>

            <div>
                <label className="block mb-1 font-medium">First name</label>
                <input
                    type="text"
                    className="w-full border px-2 py-1 rounded"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Last name</label>
                <input
                    type="text"
                    className="w-full border px-2 py-1 rounded"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                    type="email"
                    className="w-full border px-2 py-1 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="text-sm text-gray-600">
                Booking from <strong>{dateRange.from}</strong> to{" "}
                <strong>
                    {
                        new Date(new Date(dateRange.until).getTime() - 86400000)
                            .toISOString()
                            .slice(0, 10)
                    }
                </strong>
            </div>

            {error && (
                <div className="text-red-600 text-sm">
                    Failed to book room. Please try again.
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                {loading ? "Booking..." : "Book Now"}
            </button>
        </form>
    );
}
