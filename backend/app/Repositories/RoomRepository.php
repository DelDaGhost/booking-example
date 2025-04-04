<?php

namespace App\Repositories;

use App\Models\Room;
use Illuminate\Database\Eloquent\Collection;

class RoomRepository
{

    /**
     * @return Collection<int, Room>
     */
    public function getAvailableRooms(): Collection
    {
        return Room::all();
    }
}
