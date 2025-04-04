<?php declare(strict_types=1);

namespace App\GraphQL\Validators;

use App\Validations\Booking;
use App\Validations\Room;
use Nuwave\Lighthouse\Validation\Validator;

final class BookRoomInputValidator extends Validator
{
    /**
     * Return the validation rules.
     *
     * @return array<string, array<mixed>>
     */
    public function rules(): array
    {
        return [
            'firstname' => Booking::FIRSTNAME,
            'lastname' => Booking::LASTNAME,
            'email' => Booking::EMAIL,
            'from' => Booking::FROM,
            'until' => Booking::UNTIL,
            'roomId' => Room::ID,
        ];
    }
}
