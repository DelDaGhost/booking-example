<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Room;
use App\Repositories\RoomRepository;
use Illuminate\Database\Eloquent\Collection;

final class AvailableRooms
{
    public function __construct(
        private RoomRepository $roomRepository,
    ) {
    }

    /**
     * @param  null  $_
     * @param  array{}  $args
     * @return Collection<int, Room>
     */
    public function __invoke($_, array $args): Collection
    {
        return $this->roomRepository->getAvailableRooms();
    }
}
