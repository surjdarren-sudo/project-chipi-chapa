<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User; 

class Invoice extends Model
{
    // Pastikan penulisan protected benar (pakai spasi)
    protected $fillable = ['user_id', 'invoice_number', 'address', 'postal_code', 'total_price'];

    public function user() 
    {
        return $this->belongsTo(User::class);
    }
}