export default function RoomSelector({
                                         onSelect,
                                         roomsData,
                                     }: {
    onSelect: (id: number) => void;
    roomsData: { id: number; name: string }[];
}) {
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
                {roomsData.map((room) => (
                    <option key={room.id} value={room.id}>
                        {room.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
