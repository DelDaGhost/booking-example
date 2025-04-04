<?php

namespace App\Validations;

class Booking
{
    public const FIRSTNAME = ['required', 'string', 'min:2', 'max:20'];
    public const LASTNAME = ['required', 'string', 'min:2', 'max:20'];
    public const EMAIL = ['required', 'string', 'email'];
    public const FROM = ['required', 'date'];
    public const UNTIL = ['required', 'date', 'after_or_equal:from'];
}
