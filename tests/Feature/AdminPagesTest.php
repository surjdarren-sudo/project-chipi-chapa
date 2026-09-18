<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_halaman_tambah_barang_bisa_diakses()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/admin/items/create');

        $response->assertStatus(200);
    }

    public function test_halaman_kelola_kategori_bisa_diakses()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/admin/categories');

        $response->assertStatus(200);
    }

    public function test_halaman_daftar_barang_bisa_diakses()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/admin/items');

        $response->assertStatus(200);
    }

    public function test_guest_tidak_bisa_akses_tanpa_login()
    {
        $response = $this->get('/admin/items/create');

        $response->assertRedirect('/login');
    }
}