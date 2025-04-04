<?php
declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Booking;
use App\Repositories\BookingRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

final class Bookings
{
    public function __construct(
        private BookingRepository $bookingRepository,
    ) {
    }

    /**
     * @param null $_
     * @param array{roomId: ?int} $args
     * @return array<Booking|Builder>|Collection<int, Booking>
     */
    public function __invoke($_, array $args): mixed
    {
        return $this->bookingRepository->getBookingsWhereRoomId($args['roomId'] ?? null);
    }
}
