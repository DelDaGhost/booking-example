<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Repositories\RoomRepository;

final class AvailableRooms
{
    public function __construct(
        private RoomRepository $roomRepository,
    ) {
    }

    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        return $this->roomRepository->getAvailableRooms();
    }
}
