<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Room;
use Illuminate\Database\Eloquent\Collection;

final class Rooms
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     * @return Collection<int, Room>
     */
    public function __invoke($_, array $args): Collection
    {
        return Room::all();
    }
}
