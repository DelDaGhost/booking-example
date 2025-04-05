import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const BOOK_ROOM = gql`
    mutation BookRoom($input: BookRoomInput!) {
        bookRoom(input: $input) {
            id
        }
    }
`;

export default function BookingForm({
                                        roomId,
                                        dateRange,
                                        onPriceCalculated,
                                    }: {
    roomId: number;
    dateRange: { from: string; until: string };
    onPriceCalculated: (price: number) => void;
}) {
    const [form, setForm] = useState({ firstname: "", lastname: "", email: "" });
    const [submitRoom] = useMutation(BOOK_ROOM);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const days =
            (new Date(dateRange.until).getTime() - new Date(dateRange.from).getTime()) /
            (1000 * 60 * 60 * 24);
        const pricePerNight = 100; // TODO: fetch room price if dynamic
        const total = days * pricePerNight;

        onPriceCalculated(total);

        await submitRoom({
            variables: {
                input: {
                    ...form,
                    from: dateRange.from,
                    until: dateRange.until,
                    roomId,
                },
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
                First Name
                <input
                    required
                    className="border rounded w-full px-3 py-2 mt-1"
                    onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                />
            </label>
            <label className="block">
                Last Name
                <input
                    required
                    className="border rounded w-full px-3 py-2 mt-1"
                    onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                />
            </label>
            <label className="block">
                Email
                <input
                    type="email"
                    required
                    className="border rounded w-full px-3 py-2 mt-1"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
            </label>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Confirm Booking
            </button>
        </form>
    );
}
