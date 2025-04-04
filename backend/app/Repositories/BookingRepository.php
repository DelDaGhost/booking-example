<?php

namespace App\Repositories;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Carbon;

class BookingRepository
{
    public function save(Booking $booking): void
    {
        $booking->save();
    }

    public function isRoomAvailable(
        int $roomId,
        Carbon $from,
        Carbon $until
    ): bool {
        return !Booking::query()
            ->where('room_id', $roomId)
            ->where(function ($query) use ($from, $until) {
                $query->whereBetween('from', [$from, $until])
                    ->orWhereBetween('until', [$from, $until])
                    ->orWhere(function ($query) use ($from, $until) {
                        $query->where('from', '<', $from)
                            ->where('until', '>', $until);
                    });
            })
            ->exists();
    }

    /**
     * @param int|null $roomId
     * @return array<Booking|Builder>|Collection<int, Booking>
     */
    public function getBookingsWhereRoomId(?int $roomId): mixed
    {
        $query = Booking::query();

        if (!is_null($roomId)) {
            $query->where('room_id', $roomId);
        }

        return $query->get();
    }
}
