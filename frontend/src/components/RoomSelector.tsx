import { useQuery, gql } from "@apollo/client";

const ROOMS_QUERY = gql`
    query GetRooms {
        rooms {
            id
            name
        }
    }
`;

export default function RoomSelector({ onSelect }: { onSelect: (id: number) => void }) {
    const { data, loading, error } = useQuery(ROOMS_QUERY);

    if (loading) return <div>Loading rooms...</div>;
    if (error) return <div>Error loading rooms.</div>;

    return (
        <div>
            <label className="block mb-1 font-medium">Choose a room</label>
            <select
                className="border rounded px-3 py-2 w-full"
                onChange={(e) => onSelect(Number(e.target.value))}
                defaultValue=""
            >
                <option value="" disabled>
                    Select a room
                </option>
                {data.rooms.map((room: any) => (
                    <option key={room.id} value={room.id}>
                        {room.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
