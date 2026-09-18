<?php

namespace Tests;

use App\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    /**
     * Bikin user baru dan langsung "login" sebagai user itu.
     * Dipakai di banyak test supaya gak perlu tulis
     * User::factory()->create() berulang-ulang.
     */
    protected function loginAsUser()
    {
        $user = User::factory()->create();
        return $this->actingAs($user);
    }
}
