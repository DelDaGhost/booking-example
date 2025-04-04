<?php

namespace Tests\Unit\Services;

use App\Exceptions\RoomNotAvailableException;
use App\Models\Booking;
use App\Repositories\BookingRepository;
use App\Services\BookRoom;
use App\Services\Dtos\BookRoomDto;
use Illuminate\Support\Carbon;
use PHPUnit\Framework\TestCase;
use Mockery;

class BookRoomTest extends TestCase
{
    protected BookRoom $bookRoom;
    protected Mockery\LegacyMockInterface|Mockery\MockInterface $bookingRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->bookingRepository = Mockery::mock(BookingRepository::class);
        $this->bookRoom = new BookRoom($this->bookingRepository);
    }

    public function testBookRoom(): void
    {
        $dto = new BookRoomDto(
            'Max',
            'Graf',
            'max@graf.at',
            Carbon::createFromDate(2024, 02,12),
            Carbon::createFromDate(2024, 02,14),
            2,
        );

        $this->bookingRepository
            ->shouldReceive('isRoomAvailable')
            ->with($dto->getRoomId(), $dto->getFrom(), $dto->getUntil())
            ->andReturn(true)
            ->once();

        $this->bookingRepository
            ->shouldReceive('save')
            ->withArgs(
                function (Booking $booking) use ($dto) {
                    return $booking->firstname == $dto->getFirstname()
                        && $booking->lastname == $dto->getLastname()
                        && $booking->email == $dto->getEmail()
                        && $booking->from == $dto->getFrom()
                        && $booking->until == $dto->getUntil()
                        && $booking->room_id == $dto->getRoomId();
                }
            )
            ->once();

        $booking = $this->bookRoom->handle($dto);

        $this->assertEquals($dto->getFirstname(), $booking->firstname);
        $this->assertEquals($dto->getLastname(), $booking->lastname);
        $this->assertEquals($dto->getEmail(), $booking->email);
        $this->assertEquals($dto->getFrom(), $booking->from);
        $this->assertEquals($dto->getUntil(), $booking->until);
        $this->assertEquals($dto->getRoomId(), $booking->room_id);
    }

    public function testBookNotAvailableRoom(): void
    {
        $this->expectException(RoomNotAvailableException::class);
        $this->expectExceptionMessage('Room not available!');

        $dto = new BookRoomDto(
            'Max',
            'Graf',
            'max@graf.at',
            Carbon::createFromDate(2024, 02,12),
            Carbon::createFromDate(2024, 02,14),
            2,
        );

        $this->bookingRepository
            ->shouldReceive('isRoomAvailable')
            ->with($dto->getRoomId(), $dto->getFrom(), $dto->getUntil())
            ->andReturn(false)
            ->once();

        $this->bookingRepository
            ->shouldReceive('save')
            ->never();

        $this->bookRoom->handle($dto);
    }
}
