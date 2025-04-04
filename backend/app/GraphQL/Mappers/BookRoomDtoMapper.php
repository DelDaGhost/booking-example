<?php

namespace App\GraphQL\Mappers;

use App\Services\Dtos\BookRoomDto;

class BookRoomDtoMapper
{
    /**
     * @param array<mixed> $input
     * @return BookRoomDto
     */
    public function map(array $input): BookRoomDto
    {
        return new BookRoomDto(
            $input['input']['firstname'],
            $input['input']['lastname'],
            $input['input']['email'],
            $input['input']['from'],
            $input['input']['until'],
            $input['input']['roomId'],
        );
    }
}
