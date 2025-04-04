<?php

namespace App\Exceptions;

use GraphQL\Error\ClientAware;

class RoomNotAvailableException extends \Exception implements ClientAware
{
    public function isClientSafe(): bool
    {
        return true;
    }
}
