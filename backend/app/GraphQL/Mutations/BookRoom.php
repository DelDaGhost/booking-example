<?php
declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\GraphQL\Mappers\BookRoomDtoMapper;
use App\Models\Booking;

final class BookRoom
{
    public function __construct(
        private BookRoomDtoMapper $mapper,
        private \App\Services\BookRoom $bookRoom,
    ) {
    }

    /**
     * @param null $_
     * @param array{} $args
     * @return Booking
     */
    public function __invoke($_, array $args): Booking
    {
        return $this->bookRoom->handle(
            $this->mapper->map($args),
        );
    }
}
