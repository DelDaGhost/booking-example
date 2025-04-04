<?php

namespace App\Services;

use App\Exceptions\RoomNotAvailableException;
use App\Models\Booking;
use App\Repositories\BookingRepository;
use App\Services\Dtos\BookRoomDto;

class BookRoom
{
    public function __construct(
        protected BookingRepository $bookingRepository,
    ) {
    }

    public function handle(BookRoomDto $dto): Booking
    {
        if (!$this->bookingRepository->isRoomAvailable($dto->getRoomId(), $dto->getFrom(), $dto->getUntil())) {
            throw new RoomNotAvailableException('Room not available!');
        }

        $booking = new Booking();
        $booking->firstname = $dto->getFirstname();
        $booking->lastname = $dto->getLastname();
        $booking->email = $dto->getEmail();
        $booking->from = $dto->getFrom();
        $booking->until = $dto->getUntil();
        $booking->room_id = $dto->getRoomId();

        $this->bookingRepository->save($booking);

        return $booking;
    }
}
