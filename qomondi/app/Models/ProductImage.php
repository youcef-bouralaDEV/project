<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductImage extends Model
{
    use HasFactory;
    protected $table = 'images';

    protected $fillable = ['image', 'product_id'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}