<?php

namespace App\Services\Dtos;

use Illuminate\Support\Carbon;

class BookRoomDto
{
    protected string $firstname;
    protected string $lastname;
    protected string $email;
    protected Carbon $from;
    protected Carbon $until;
    protected int $roomId;

    /**
     * @param string $firstname
     * @param string $lastname
     * @param string $email
     * @param Carbon $from
     * @param Carbon $until
     * @param int $roomId
     */
    public function __construct(
        string $firstname,
        string $lastname,
        string $email,
        Carbon $from,
        Carbon $until,
        int $roomId
    ) {
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->email = $email;
        $this->from = $from;
        $this->until = $until;
        $this->roomId = $roomId;
    }

    public function getFirstname(): string
    {
        return $this->firstname;
    }

    public function getLastname(): string
    {
        return $this->lastname;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getFrom(): Carbon
    {
        return $this->from;
    }

    public function getUntil(): Carbon
    {
        return $this->until;
    }

    public function getRoomId(): int
    {
        return $this->roomId;
    }
}
