<?php

namespace App\Validations;

class Room
{
    public const ID = ['required', 'int', 'exists:' . \App\Models\Room::class . ',id'];
}
