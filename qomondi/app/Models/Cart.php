<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Cart extends Model
{
            use HasFactory;
    
    protected $table = 'carts';
    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
    ];

   
    
    protected $with = ['product'];
    
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}