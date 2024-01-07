<?php

namespace App\Models;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['Nom', 'Icon', 'order', 'Catégorie mére', 'etat'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }


   
}