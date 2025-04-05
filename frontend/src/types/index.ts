export type Room = {
    id: number;
    name: string;
    price: number;
};

export type Booking = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    from: string;
    until: string;
    room: Room;
};
