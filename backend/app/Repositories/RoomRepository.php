<?php

namespace App\Repositories;

use App\Models\Room;
use Illuminate\Database\Eloquent\Collection;

class RoomRepository
{
    public function getAvailableRooms(): Collection
    {
        return Room::all();
    }
}
